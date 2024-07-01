import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/types';
import { CreateTaskCardSchema } from './schema';

export type InputType = z.infer<typeof CreateTaskCardSchema>;
export type OutputType = ActionState<InputType, TaskCard>;
