'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { SignInWithEmailAndPasswordSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { email, password } = data;

  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    return { error: '[SIGN_IN]: Failed sign in' };
  }

  return {};
};

export const signInWithEmailAndPassword = createSafeAction(
  SignInWithEmailAndPasswordSchema,
  handler
);
