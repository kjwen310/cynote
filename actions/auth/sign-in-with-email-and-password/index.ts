'use server';

import { redirect } from 'next/navigation';
import createSupabaseServerClient from '@/lib/supabase/server';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/lib/utils';
import { SignInWithEmailAndPasswordSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { email, password } = data;

  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error) {
    return { error: '[SIGN_IN]: Failed sign in' };
  }

  redirect('/workspace');
};

export const signInWithEmailAndPassword = createSafeAction(
  SignInWithEmailAndPasswordSchema,
  handler
);
