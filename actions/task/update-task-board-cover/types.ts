import { z } from 'zod';
import { TaskBoard } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { UpdateTaskBoardCoverSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskBoardCoverSchema>;
export type OutputType = ActionState<InputType, TaskBoard>;
