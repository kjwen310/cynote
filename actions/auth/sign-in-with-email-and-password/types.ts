import { z } from 'zod';
import { ActionState } from '@/lib/utils/create-safe-action';
import { SignInWithEmailAndPasswordSchema } from './schema';

export type InputType = z.infer<typeof SignInWithEmailAndPasswordSchema>;
export type OutputType = ActionState<InputType, any>;
