import { z } from 'zod';

export const FetchHistoryLogSchema = z.object({
  workspaceId: z.string(),
  page: z.number(),
  type: z.optional(z.string()),
  collaboratorId: z.optional(z.string()),
});
