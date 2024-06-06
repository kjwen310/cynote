import { z } from 'zod';
import { HistoryLog } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { FetchHistoryLogSchema } from './schema';

type HistoryLogsWithCount = {
    data: HistoryLog[],
    count: number,
}

export type InputType = z.infer<typeof FetchHistoryLogSchema>;
export type OutputType = ActionState<InputType, HistoryLogsWithCount>;
