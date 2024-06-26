import { z } from 'zod';
import { TaskList } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateTaskListSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskListSchema>;
export type OutputType = ActionState<InputType, TaskList>;
