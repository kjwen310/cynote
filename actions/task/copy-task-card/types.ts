import { z } from 'zod';
import { TaskCard } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { CopyTaskCardSchema } from './schema';

export type InputType = z.infer<typeof CopyTaskCardSchema>;
export type OutputType = ActionState<InputType, TaskCard>;
