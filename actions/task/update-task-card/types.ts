import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { UpdateTaskCardSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskCardSchema>;
export type OutputType = ActionState<InputType, TaskCard>;
