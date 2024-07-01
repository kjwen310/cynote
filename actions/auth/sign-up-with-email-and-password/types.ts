import { z } from 'zod';
import { ActionState } from '@/types';
import { SignUpWithEmailAndPasswordSchema } from './schema';

export type InputType = z.infer<typeof SignUpWithEmailAndPasswordSchema>;
export type OutputType = ActionState<InputType, any>;
