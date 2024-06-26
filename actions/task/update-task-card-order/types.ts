import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateTaskCardOrderSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskCardOrderSchema>;
export type OutputType = ActionState<InputType, TaskCard[]>;
