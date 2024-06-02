import { z } from 'zod';

export const LeaveWorkspaceSchema = z.object({
  workspaceId: z.string(),
});
