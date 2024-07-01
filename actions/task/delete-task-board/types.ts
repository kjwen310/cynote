import { z } from 'zod';
import { TaskBoard } from '@prisma/client';
import { ActionState } from '@/types';
import { DeleteTaskBoardSchema } from './schema';

export type InputType = z.infer<typeof DeleteTaskBoardSchema>;
export type OutputType = ActionState<InputType, TaskBoard>;
