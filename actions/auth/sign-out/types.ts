import { z } from 'zod';
import { ActionState } from '@/types';
import { SignOutSchema } from './schema';

export type InputType = z.infer<typeof SignOutSchema>;
export type OutputType = ActionState<InputType, any>;
