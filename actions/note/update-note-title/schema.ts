import { z } from 'zod';

export const UpdateNoteTitleSchema = z.object({
  workspaceId: z.string(),
  noteId: z.string(),
  title: z.string().min(1, { message: 'Title is required' }),
});
