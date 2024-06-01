import { z } from 'zod';

export const RefreshInviteCodeSchema = z.object({
  workspaceId: z.string(),
});
