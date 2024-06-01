'use server';

import createSupabaseServerClient from '@/lib/supabase/server';

export const getCurrentUser = async () => {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getUser();
};
