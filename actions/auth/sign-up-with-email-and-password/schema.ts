import { z } from 'zod';

export const SignUpWithEmailAndPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email format is incorrect' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'password is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
});
