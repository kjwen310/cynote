import { z } from 'zod';

export const CopyTaskCardSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskCardId: z.string(),
});
