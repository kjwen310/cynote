import { z } from 'zod';
import { TaskBoard } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateTaskBoardCoverSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskBoardCoverSchema>;
export type OutputType = ActionState<InputType, TaskBoard>;
