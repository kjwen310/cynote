import { z } from 'zod';
import { TaskList } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { DeleteTaskListSchema } from './schema';

export type InputType = z.infer<typeof DeleteTaskListSchema>;
export type OutputType = ActionState<InputType, TaskList>;
