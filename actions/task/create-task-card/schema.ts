import { z } from 'zod';

export const CreateTaskCardSchema = z.object({
  listId: z.string(),
  workspaceId: z.string(),
  taskBoardId: z.string(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.optional(z.string()),
});
