import { z } from 'zod';
import { TaskList } from '@prisma/client';
import { ActionState } from '@/types';
import { CopyTaskListSchema } from './schema';

export type InputType = z.infer<typeof CopyTaskListSchema>;
export type OutputType = ActionState<InputType, TaskList>;
