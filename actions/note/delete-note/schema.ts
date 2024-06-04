import { z } from 'zod';

export const DeleteNoteSchema = z.object({
  workspaceId: z.string(),
  noteId: z.string(),
});
