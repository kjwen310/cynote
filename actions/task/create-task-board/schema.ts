import { z } from 'zod';

export const CreateTaskBoardSchema = z.object({
  workspaceId: z.string(),
  title: z.string().min(1, { message: 'Title is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
});
