import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateTaskCardAssignSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskCardAssignSchema>;
export type OutputType = ActionState<InputType, TaskCard>;
