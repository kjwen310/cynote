import { z } from 'zod';

export const UpdateNoteCoverSchema = z.object({
  workspaceId: z.string(),
  noteId: z.string(),
  image: z.string().min(1, { message: 'Image is required' }),
});
