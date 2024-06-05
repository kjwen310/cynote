import { z } from 'zod';

export const UpdateNoteContentSchema = z.object({
  workspaceId: z.string(),
  noteId: z.string(),
  content: z.string(),
});
