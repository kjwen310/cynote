import { z } from 'zod';

export const UpdateTaskListSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskListId: z.string(),
  title: z.string().min(1, { message: 'Title is required' }),
});
