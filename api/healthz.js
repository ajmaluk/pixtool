/**
 * Serverless / Edge API Endpoint: /api/healthz
 * Pings Supabase to prevent the 7-day inactivity pause
 */

export default async function handler(req, res) {
  const env = (typeof globalThis !== 'undefined' && globalThis.process?.env) ? globalThis.process.env : {};
  const supabaseUrl = env.VITE_SUPABASE_URL || 'https://sjhqxwrreasscvmzuyby.supabase.co';
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqaHF4d3JyZWFzc2N2bXp1eWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MzYyMTYsImV4cCI6MjEwMzMxMjIxNn0.ccHkb-mFifAR41qsfP9m6xbO4ElDmPyZJmQfEdolkYY';

  const startTime = Date.now();

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/tools?select=id,name&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    const elapsed = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      return res ? res.status(500).json({
        status: 'error',
        database: 'disconnected',
        error: errorText,
        timestamp: new Date().toISOString()
      }) : new Response(JSON.stringify({ status: 'error', error: errorText }), { status: 500 });
    }

    const data = await response.json();

    const payload = {
      status: 'ok',
      service: 'pixtool-supabase-keepalive',
      database: {
        provider: 'Supabase PostgreSQL',
        connected: true,
        latency_ms: elapsed,
        sample_record: data?.[0]?.name || 'verified',
        project_ref: 'sjhqxwrreasscvmzuyby'
      },
      anti_pause: {
        active: true,
        guard_status: 'counter_reset_success'
      },
      timestamp: new Date().toISOString()
    };

    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      return res.status(200).json(payload);
    }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });

  } catch (error) {
    const errPayload = {
      status: 'error',
      message: error.message || 'Failed to ping Supabase',
      timestamp: new Date().toISOString()
    };

    if (res && typeof res.status === 'function') {
      return res.status(500).json(errPayload);
    }

    return new Response(JSON.stringify(errPayload), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
