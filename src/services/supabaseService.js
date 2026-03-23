import { hasSupabaseConfig, supabase, getSupabaseFunctionUrl } from '../lib/supabaseClient';

const USER_ID_KEY = 'pix_user_id';
const RATED_TOOLS_KEY = 'pix_rated_tools';
const RATE_LIMIT_KEY = 'pix_rate_limits';
const ADMIN_SESSION_KEY = 'pix_admin_session';
const TOOL_CACHE_TTL_MS = 5 * 60 * 1000;
const PUBLIC_METRICS_CACHE_KEY = 'pix_public_metrics_cache';
const PUBLIC_METRICS_CACHE_TTL_MS = 5 * 60 * 1000;

const toolSlugCache = new Map();

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_FETCH_TIMEOUT_MS = 12000;

const isBrowser = typeof window !== 'undefined';

const b64url = (input) =>
  btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const getStoredJson = (key, fallback) => {
  if (!isBrowser) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const setStoredJson = (key, value) => {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
};

const clearStoredValue = (key) => {
  if (!isBrowser) return;
  localStorage.removeItem(key);
};

const formatSupabaseError = (error, fallbackMessage = 'Request failed') => {
  if (!error) return fallbackMessage;
  const message = String(error.message || fallbackMessage);
  if (error.code === 'PGRST116' || /no rows returned/i.test(message)) {
    return 'Record not found.';
  }
  if (error.code === '23505' || /duplicate|unique/i.test(message)) {
    return 'Already submitted.';
  }
  if (/rate limited/i.test(message)) {
    return 'Too many requests. Please try again shortly.';
  }
  return message;
};

const fetchWithTimeout = async (url, options, timeoutMs = DEFAULT_FETCH_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Request timed out. Please retry.');
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
};

export const getOrCreateUserId = () => {
  if (!isBrowser) return 'server-render';
  const existing = localStorage.getItem(USER_ID_KEY);
  if (existing) return existing;
  const generated = (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(USER_ID_KEY, generated);
  return generated;
};

const sha256 = async (value) => {
  if (!value || typeof crypto === 'undefined' || !crypto.subtle) {
    return null;
  }
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const fetchIpAddress = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload.ip || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

export const getIpHash = async () => {
  const ip = await fetchIpAddress();
  if (!ip) return null;
  return sha256(ip);
};

export const enforceClientRateLimit = (action, windowMs = 10000) => {
  const now = Date.now();
  const all = getStoredJson(RATE_LIMIT_KEY, {});
  const last = all[action] || 0;
  if (now - last < windowMs) {
    const waitMs = windowMs - (now - last);
    throw new Error(`Rate limited. Try again in ${Math.ceil(waitMs / 1000)}s.`);
  }
  all[action] = now;
  setStoredJson(RATE_LIMIT_KEY, all);
};

const getRatedToolsSet = () => new Set(getStoredJson(RATED_TOOLS_KEY, []));

const markToolAsRated = (toolSlug) => {
  const rated = getRatedToolsSet();
  rated.add(toolSlug);
  setStoredJson(RATED_TOOLS_KEY, Array.from(rated));
};

export const hasRatedToolLocally = (toolSlug) => getRatedToolsSet().has(toolSlug);

const getToolBySlug = async (toolSlug) => {
  const now = Date.now();
  const cached = toolSlugCache.get(toolSlug);
  if (cached && now - cached.ts < TOOL_CACHE_TTL_MS) {
    return cached.value;
  }

  const { data, error } = await supabase
    .from('tools')
    .select('id, name, slug')
    .eq('slug', toolSlug)
    .single();

  if (error) throw new Error(formatSupabaseError(error, 'Unable to resolve tool.'));
  toolSlugCache.set(toolSlug, { ts: now, value: data });
  return data;
};

export const getToolRatingStats = async (toolSlug) => {
  if (!hasSupabaseConfig || !toolSlug) {
    return { avgRating: 0, totalVotes: 0, distribution: [0, 0, 0, 0, 0] };
  }

  const tool = await getToolBySlug(toolSlug);
  const { data, error } = await supabase
    .from('tool_stats')
    .select('avg_rating, total_votes, rating_1, rating_2, rating_3, rating_4, rating_5')
    .eq('tool_id', tool.id)
    .maybeSingle();

  if (error) throw new Error(formatSupabaseError(error, 'Unable to load tool ratings.'));

  return {
    avgRating: data?.avg_rating || 0,
    totalVotes: data?.total_votes || 0,
    distribution: [
      data?.rating_1 || 0,
      data?.rating_2 || 0,
      data?.rating_3 || 0,
      data?.rating_4 || 0,
      data?.rating_5 || 0,
    ],
  };
};

export const submitToolRating = async ({ toolSlug, rating }) => {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase is not configured.');
  }
  if (!toolSlug) {
    throw new Error('Tool is required.');
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5.');
  }

  enforceClientRateLimit(`rating:${toolSlug}`, 10000);

  const userId = getOrCreateUserId();
  const ipHash = await getIpHash();

  const { data, error } = await supabase.rpc('submit_tool_rating', {
    p_tool_slug: toolSlug,
    p_user_id: userId,
    p_ip_hash: ipHash,
    p_rating: rating,
    p_window_seconds: 10,
  });

  if (error) {
    const normalized = formatSupabaseError(error, 'Unable to submit rating.');
    if (/already/i.test(normalized)) {
      markToolAsRated(toolSlug);
      throw new Error('You already rated this tool.');
    }
    if (/rate limited|too many/i.test(normalized)) {
      throw new Error('Rate limited. Try again in a few seconds.');
    }
    throw new Error(normalized);
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row) {
    throw new Error('Unable to submit rating. Please retry.');
  }

  if (row.already_rated) {
    markToolAsRated(toolSlug);
    throw new Error('You already rated this tool.');
  }

  markToolAsRated(toolSlug);
  return {
    avgRating: row.avg_rating || 0,
    totalVotes: row.total_votes || 0,
    distribution: [row.rating_1 || 0, row.rating_2 || 0, row.rating_3 || 0, row.rating_4 || 0, row.rating_5 || 0],
  };
};

export const getOverallRating = async () => {
  if (!hasSupabaseConfig) {
    return { avgRating: 0, totalVotes: 0 };
  }

  try {
    const metrics = await getPublicSeoMetrics();
    if (metrics && Number(metrics.overall_total_votes || 0) >= 0) {
      return {
        avgRating: Number(metrics.overall_avg_rating || 0),
        totalVotes: Number(metrics.overall_total_votes || 0),
      };
    }
  } catch {
    // Fallback to direct view query when endpoint is unavailable.
  }

  const { data, error } = await supabase
    .from('overall_tool_rating')
    .select('avg_rating, total_votes')
    .maybeSingle();

  if (error) throw new Error(formatSupabaseError(error, 'Unable to load overall rating.'));

  if (!data) {
    return { avgRating: 0, totalVotes: 0 };
  }

  return {
    avgRating: data.avg_rating || 0,
    totalVotes: data.total_votes || 0,
  };
};

export const getPublicSeoMetrics = async ({ forceRefresh = false } = {}) => {
  if (!hasSupabaseConfig) {
    return null;
  }

  if (!forceRefresh) {
    const cached = getStoredJson(PUBLIC_METRICS_CACHE_KEY, null);
    if (cached?.ts && Date.now() - Number(cached.ts) < PUBLIC_METRICS_CACHE_TTL_MS) {
      return cached.value || null;
    }
  }

  const url = getSupabaseFunctionUrl('public-metrics');
  if (!url) {
    throw new Error('Public metrics endpoint is unavailable.');
  }

  const response = await fetchWithTimeout(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Public metrics request failed.');
  }

  const metrics = payload?.metrics || null;
  setStoredJson(PUBLIC_METRICS_CACHE_KEY, { ts: Date.now(), value: metrics });
  return metrics;
};

export const getApprovedTestimonials = async ({ toolSlug = null, page = 1, pageSize = DEFAULT_PAGE_SIZE } = {}) => {
  if (!hasSupabaseConfig) {
    return { rows: [], count: 0 };
  }

  let query = supabase
    .from('testimonials')
    .select('id, name, message, tool_id, created_at, tools:tool_id(slug,name)', { count: 'exact' })
    .eq('approved', true)
    .order('created_at', { ascending: false });

  if (toolSlug) {
    const tool = await getToolBySlug(toolSlug);
    query = query.eq('tool_id', tool.id);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(formatSupabaseError(error, 'Unable to load testimonials.'));

  return {
    rows: data || [],
    count: count || 0,
  };
};

export const submitTestimonial = async ({ name, message, toolSlug = null }) => {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase is not configured.');
  }
  enforceClientRateLimit('testimonial', 10000);

  let toolId = null;
  if (toolSlug) {
    const tool = await getToolBySlug(toolSlug);
    toolId = tool.id;
  }

  const payload = {
    name: (name || '').trim(),
    message: (message || '').trim(),
    tool_id: toolId,
  };

  const { error } = await supabase.from('testimonials').insert(payload);
  if (error) throw new Error(formatSupabaseError(error, 'Unable to submit testimonial.'));
};

export const submitContactMessage = async ({ name, email, message }) => {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase is not configured.');
  }

  enforceClientRateLimit('contact', 10000);

  const { error } = await supabase.from('contacts').insert({
    name: (name || '').trim(),
    email: (email || '').trim(),
    message: (message || '').trim(),
  });

  if (error) throw new Error(formatSupabaseError(error, 'Unable to submit contact message.'));
};

const parseAdminSession = () => {
  const session = getStoredJson(ADMIN_SESSION_KEY, null);
  if (!session?.token || !session?.expiresAt) return null;
  if (Date.now() > Number(session.expiresAt)) {
    clearStoredValue(ADMIN_SESSION_KEY);
    return null;
  }
  return session;
};

export const getAdminSession = () => parseAdminSession();

export const adminLogout = () => {
  clearStoredValue(ADMIN_SESSION_KEY);
};

export const adminLogin = async ({ username, password }) => {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase is not configured.');
  }

  const url = getSupabaseFunctionUrl('admin-login');
  if (!url) {
    throw new Error('Admin endpoint is unavailable.');
  }

  const response = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ username, password }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Admin login failed.');
  }

  const session = {
    token: payload.token,
    expiresAt: payload.expiresAt,
    username,
  };

  setStoredJson(ADMIN_SESSION_KEY, session);
  return session;
};

export const adminApi = async (action, payload = {}) => {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase is not configured.');
  }

  const session = parseAdminSession();
  if (!session) {
    throw new Error('Admin session expired. Please login again.');
  }

  const url = getSupabaseFunctionUrl('admin-api');
  if (!url) {
    throw new Error('Admin endpoint is unavailable.');
  }

  const response = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify({ action, payload }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || 'Admin API request failed.');
  }
  if ((action === 'list_testimonials' || action === 'list_contacts') && !body.meta) {
    return {
      rows: body.rows || [],
      meta: {
        page: Number(payload.page || 1),
        pageSize: Number(payload.pageSize || DEFAULT_PAGE_SIZE),
        count: Number(body.count || 0),
        totalPages: Math.max(1, Math.ceil(Number(body.count || 0) / Number(payload.pageSize || DEFAULT_PAGE_SIZE))),
        hasPrev: Number(payload.page || 1) > 1,
        hasNext: Number(payload.page || 1) < Math.max(1, Math.ceil(Number(body.count || 0) / Number(payload.pageSize || DEFAULT_PAGE_SIZE))),
      },
    };
  }
  return body;
};

export const encodeUserIdForDebug = () => b64url(getOrCreateUserId());
