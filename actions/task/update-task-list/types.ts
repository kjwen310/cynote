import { z } from 'zod';
import { TaskList } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { UpdateTaskListSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskListSchema>;
export type OutputType = ActionState<InputType, TaskList>;
