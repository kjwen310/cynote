import { z } from 'zod';

export const CreateTaskListSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  title: z.string().min(1, { message: 'Title is required' }),
});
