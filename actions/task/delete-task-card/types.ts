import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { DeleteTaskCardSchema } from './schema';

export type InputType = z.infer<typeof DeleteTaskCardSchema>;
export type OutputType = ActionState<InputType, TaskCard>;
