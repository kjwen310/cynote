import { z } from 'zod';
import { TaskList } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateTaskListOrderSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskListOrderSchema>;
export type OutputType = ActionState<InputType, TaskList[]>;
