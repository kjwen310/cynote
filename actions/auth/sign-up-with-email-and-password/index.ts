'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/lib/utils/create-safe-action';
import { SignUpWithEmailAndPasswordSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { email, password, name } = data;

  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });
  } catch (error) {
    return { error: '[SIGN_UP]: Failed sign up' };
  }

  return {};
};

export const signUpWithEmailAndPassword = createSafeAction(SignUpWithEmailAndPasswordSchema, handler);
