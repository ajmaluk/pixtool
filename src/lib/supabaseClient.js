import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  SUPABASE_URL !== 'your_url' &&
  SUPABASE_ANON_KEY !== 'your_key'
);

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
