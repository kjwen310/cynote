import { z } from 'zod';
import { ActionState } from '@/types';
import { StripeRedirectSchema } from './schema';

export type InputType = z.infer<typeof StripeRedirectSchema>;
export type OutputType = ActionState<InputType, string>;
