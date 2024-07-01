import { z } from 'zod';
import { HistoryLog } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { GetHistoryLogByCardSchema } from './schema';

export type InputType = z.infer<typeof GetHistoryLogByCardSchema>;
export type OutputType = ActionState<InputType, HistoryLog[]>;
