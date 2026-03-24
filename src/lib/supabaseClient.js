import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const validateSupabaseUrl = (url) => {
  if (!url) return false;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return false;
    if (!u.hostname.endsWith('.supabase.co')) return false;
    return true;
  } catch {
    return false;
  }
};

export const hasSupabaseConfig = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  SUPABASE_URL !== 'your_url' &&
  SUPABASE_ANON_KEY !== 'your_key' &&
  validateSupabaseUrl(SUPABASE_URL)
);

if (import.meta.env.PROD) {
  if (!hasSupabaseConfig) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.warn('Supabase credentials missing in production. Check Cloudflare Dashboard → Settings → Environment variables.');
    } else if (!validateSupabaseUrl(SUPABASE_URL)) {
      console.warn(`Supabase URL appears invalid: "${SUPABASE_URL}". It should be "https://[ref].supabase.co".`);
    } else {
      console.warn('Supabase configuration rejected. Check for placeholder values like "your_url" or "your_key".');
    }
  }
}

export const supabase = hasSupabaseConfig
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          'x-client-info': 'pixtool-web',
        },
      },
    })
  : null;

export const getSupabaseFunctionUrl = (fnName) => {
  if (!SUPABASE_URL) return null;
  return `${SUPABASE_URL}/functions/v1/${fnName}`;
};
