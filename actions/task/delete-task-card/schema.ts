import { z } from 'zod';

export const DeleteTaskCardSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskCardId: z.string(),
});
