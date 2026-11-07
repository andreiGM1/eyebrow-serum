import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Return real client or safe dummy if not set
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('dummy-project-id')) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

