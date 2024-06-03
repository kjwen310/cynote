import { z } from 'zod';

export const UpdateTaskBoardCoverSchema = z.object({
  workspaceId: z.string(),
  taskBoardId: z.string(),
  image: z.string().min(1, { message: 'Image is required' }),
});
