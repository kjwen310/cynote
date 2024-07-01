import { z } from 'zod';
import { TaskCardWithTaskList } from '@/types';
import { ActionState } from '@/lib/utils/create-safe-action';
import { GetTaskCardSchema } from './schema';

export type InputType = z.infer<typeof GetTaskCardSchema>;
export type OutputType = ActionState<InputType, TaskCardWithTaskList>;
