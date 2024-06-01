import { z } from 'zod';

export const DeleteWorkspaceCollaboratorSchema = z.object({
  workspaceId: z.string(),
  collaboratorId: z.string(),
});
