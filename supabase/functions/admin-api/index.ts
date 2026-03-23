// @ts-nocheck
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const textEncoder = new TextEncoder();

const toIntInRange = (value: unknown, min: number, max: number, fallback: number) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(n)));
};

const toPageMeta = (page: number, pageSize: number, count: number) => {
  const safeCount = Math.max(0, Number(count || 0));
  const totalPages = Math.max(1, Math.ceil(safeCount / pageSize));
  return {
    page,
    pageSize,
    count: safeCount,
    totalPages,
    hasPrev: page > 1,
    hasNext: page < totalPages,
  };
};

const fromB64Url = (input: string) => {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
};

const verifyToken = async (token: string, secret: string) => {
  const [header, payload, sig] = token.split('.');
  if (!header || !payload || !sig) return null;

  const data = `${header}.${payload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    fromB64Url(sig),
    textEncoder.encode(data)
  );

  if (!valid) return null;

  const payloadJson = JSON.parse(new TextDecoder().decode(fromB64Url(payload)));
  if (!payloadJson?.exp || Date.now() > Number(payloadJson.exp)) return null;
  return payloadJson;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const adminSecret = Deno.env.get('ADMIN_SESSION_SECRET') ?? '';

  if (!supabaseUrl || !serviceRole || !adminSecret) {
    return new Response(JSON.stringify({ error: 'Server secrets not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const authHeader = req.headers.get('Authorization') || '';
  const token = authHeader.replace('Bearer ', '');
  const session = await verifyToken(token, adminSecret);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(supabaseUrl, serviceRole);
  const { action, payload = {} } = await req.json().catch(() => ({ action: '' }));

  try {
    if (action === 'dashboard') {
      const [{ count: toolsCount }, { count: ratingsCount }, { count: testimonialsCount }, { count: contactsCount }] = await Promise.all([
        supabase.from('tools').select('id', { count: 'exact', head: true }),
        supabase.from('ratings').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('contacts').select('id', { count: 'exact', head: true }),
      ]);

      return new Response(JSON.stringify({
        toolsCount: toolsCount || 0,
        ratingsCount: ratingsCount || 0,
        testimonialsCount: testimonialsCount || 0,
        contactsCount: contactsCount || 0,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'add_tool') {
      const name = String(payload.name || '').trim();
      const slug = String(payload.slug || '').trim();
      if (!name || !slug) throw new Error('Name and Slug are required');

      const { data, error } = await supabase
        .from('tools')
        .insert([{ name, slug }])
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'list_tools') {
      const { data, error } = await supabase
        .from('tools')
        .select('id, name, slug, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify({ rows: data || [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'delete_tool') {
      const id = String(payload.id || '');
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'list_testimonials') {
      const page = toIntInRange(payload.page, 1, 5000, 1);
      const pageSize = toIntInRange(payload.pageSize, 1, 50, 10);
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from('testimonials')
        .select('id, name, message, approved, created_at, tool_id, tools:tool_id(name)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      return new Response(JSON.stringify({ rows: data || [], meta: toPageMeta(page, pageSize, Number(count || 0)) }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'approve_testimonial') {
      const id = String(payload.id || '');
      const approved = Boolean(payload.approved);
      const { error } = await supabase
        .from('testimonials')
        .update({ approved })
        .eq('id', id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'delete_testimonial') {
      const id = String(payload.id || '');
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'list_contacts') {
      const page = toIntInRange(payload.page, 1, 5000, 1);
      const pageSize = toIntInRange(payload.pageSize, 1, 50, 10);
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from('contacts')
        .select('id, name, email, message, status, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      return new Response(JSON.stringify({ rows: data || [], meta: toPageMeta(page, pageSize, Number(count || 0)) }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'delete_contact') {
      const id = String(payload.id || '');
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'update_contact_status') {
      const id = String(payload.id || '');
      const status = String(payload.status || 'new');
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'ratings_overview') {
      const { data, error } = await supabase
        .from('tool_stats')
        .select('tool_id, avg_rating, total_votes, rating_1, rating_2, rating_3, rating_4, rating_5, tools:tool_id(name, slug)')
        .order('total_votes', { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify({ rows: data || [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unsupported action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error?.message || error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
