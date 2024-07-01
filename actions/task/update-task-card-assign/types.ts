import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { UpdateTaskCardAssignSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskCardAssignSchema>;
export type OutputType = ActionState<InputType, TaskCard>;
