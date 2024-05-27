import { z } from 'zod';
import { TaskBoard } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { CreateTaskBoardSchema } from './schema';

export type InputType = z.infer<typeof CreateTaskBoardSchema>;
export type OutputType = ActionState<InputType, TaskBoard>;
