import { z } from 'zod';

export const FetchCollaboratorSchema = z.object({
  workspaceId: z.string(),
});
