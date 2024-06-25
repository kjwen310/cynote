import { z } from 'zod';

export const UpdateTaskCardAssignSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  taskCardId: z.string(),
  assignedToId: z.optional(z.string()),
});
