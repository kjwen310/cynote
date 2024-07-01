import { z } from 'zod';
import { HistoryLog } from '@prisma/client';
import { ActionState } from '@/types';
import { GetHistoryLogByCardSchema } from './schema';

export type InputType = z.infer<typeof GetHistoryLogByCardSchema>;
export type OutputType = ActionState<InputType, HistoryLog[]>;
