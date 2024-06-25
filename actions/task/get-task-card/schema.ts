import { z } from 'zod';

export const GetTaskCardSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskCardId: z.string(),
});
