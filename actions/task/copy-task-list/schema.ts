import { z } from 'zod';

export const CopyTaskListSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskListId: z.string(),
});
