import { z } from 'zod';
import { TaskList } from '@prisma/client';
import { ActionState } from '@/types';
import { DeleteTaskListSchema } from './schema';

export type InputType = z.infer<typeof DeleteTaskListSchema>;
export type OutputType = ActionState<InputType, TaskList>;
