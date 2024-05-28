import { z } from 'zod';

export const UpdateTaskListOrderSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  items: z.array(z.object({
    id: z.string(),
    taskBoardId: z.string(),
    title: z.string(),
    order: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }))
});
