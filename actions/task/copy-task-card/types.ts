import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/types';
import { CopyTaskCardSchema } from './schema';

export type InputType = z.infer<typeof CopyTaskCardSchema>;
export type OutputType = ActionState<InputType, TaskCard>;
