import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateTaskCardSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskCardSchema>;
export type OutputType = ActionState<InputType, TaskCard>;
