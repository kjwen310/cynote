import { ROLE } from '@prisma/client';
import { z } from 'zod';

export const UpdateWorkspaceCollaboratorSchema = z.object({
  workspaceId: z.string(),
  collaboratorId: z.string(),
  role: z.nativeEnum(ROLE),
});
