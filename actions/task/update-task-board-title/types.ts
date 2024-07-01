import { z } from 'zod';
import { TaskBoard } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateTaskBoardTitleSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskBoardTitleSchema>;
export type OutputType = ActionState<InputType, TaskBoard>;
