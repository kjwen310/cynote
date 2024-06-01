import { z } from 'zod';

export const SignInWithEmailAndPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email format is incorrect' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'password is required' }),
});
