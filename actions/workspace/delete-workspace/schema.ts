import { z } from 'zod';

export const DeleteWorkspaceSchema = z.object({
  workspaceId: z.string(),
});
