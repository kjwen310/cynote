import { z } from 'zod';
import { TaskList } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { CreateTaskListSchema } from './schema';

export type InputType = z.infer<typeof CreateTaskListSchema>;
export type OutputType = ActionState<InputType, TaskList>;
