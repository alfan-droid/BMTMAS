import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidSupabaseConfig =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id');

/**
 * Supabase client instance.
 * Returns the client when valid credentials are provided, or null to operate in offline/local storage mode.
 */
export const supabase = isValidSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
