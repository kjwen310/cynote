import { z } from 'zod';

export const UpdateTaskCardOrderSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  items: z.array(z.object({
    id: z.string(),
    taskListId: z.string(),
    createdById: z.string(),
    assignedToId: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }))
});
