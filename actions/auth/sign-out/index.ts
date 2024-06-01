'use server';

import { redirect } from 'next/navigation';
import createSupabaseServerClient from '@/lib/supabase/server';
import { OutputType } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { SignOutSchema } from './schema';

const handler = async (): Promise<OutputType> => {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/sign-in');
  } catch (error) {
    return { error: '[SIGN_OUT]: Failed sign out' };
  }
};

export const signOut = createSafeAction(SignOutSchema, handler);
