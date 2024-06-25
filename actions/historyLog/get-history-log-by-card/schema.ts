import { z } from 'zod';

export const GetHistoryLogByCardSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskCardId: z.string(),
});
