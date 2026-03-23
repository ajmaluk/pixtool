// @ts-nocheck
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const textEncoder = new TextEncoder();

const toB64Url = (input: ArrayBuffer | string) => {
  const bytes = typeof input === 'string' ? textEncoder.encode(input) : new Uint8Array(input);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const signToken = async (payload: Record<string, unknown>, secret: string) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = toB64Url(JSON.stringify(header));
  const encodedPayload = toB64Url(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(data));
  return `${data}.${toB64Url(signature)}`;
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

  const adminUser = Deno.env.get('ADMIN_USERNAME') ?? '';
  const adminPass = Deno.env.get('ADMIN_PASSWORD') ?? '';
  const adminSecret = Deno.env.get('ADMIN_SESSION_SECRET') ?? '';

  if (!adminUser || !adminPass || !adminSecret) {
    return new Response(JSON.stringify({ error: 'Admin secrets not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const body = await req.json().catch(() => ({}));
  const username = String(body?.username || '');
  const password = String(body?.password || '');

  if (username !== adminUser || password !== adminPass) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const expiresAt = Date.now() + 1000 * 60 * 60 * 24;
  const token = await signToken({ username, role: 'admin', exp: expiresAt }, adminSecret);

  return new Response(JSON.stringify({ token, expiresAt }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
