import { z } from 'zod';

export const DeleteTaskBoardSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
});
