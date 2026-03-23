// @ts-nocheck
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const cacheHeaders = {
  'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  'CDN-Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
  Vary: 'Origin',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { ...corsHeaders, ...cacheHeaders } });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, ...cacheHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

  if (!supabaseUrl || !serviceRole) {
    return new Response(JSON.stringify({ error: 'Server configuration missing' }), {
      status: 500,
      headers: { ...corsHeaders, ...cacheHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRole);
    const { data, error } = await supabase.rpc('get_public_seo_metrics');

    if (error) {
      throw error;
    }

    const metrics = Array.isArray(data) ? (data[0] || {}) : (data || {});

    return new Response(JSON.stringify({ metrics }), {
      status: 200,
      headers: {
        ...corsHeaders,
        ...cacheHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error?.message || error) }), {
      status: 500,
      headers: { ...corsHeaders, ...cacheHeaders, 'Content-Type': 'application/json' },
    });
  }
});
