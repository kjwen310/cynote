import { z } from 'zod';

export const UpdateTaskCardSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskCardId: z.string(),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
});
