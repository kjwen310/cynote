import { z } from 'zod';

export const DeleteTaskListSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskCardId: z.string(),
});
