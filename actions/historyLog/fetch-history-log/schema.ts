import { z } from 'zod';
import { LOG_TYPE } from '@prisma/client';

export const FetchHistoryLogSchema = z.object({
  workspaceId: z.string(),
  page: z.number(),
  type: z.optional(z.nativeEnum(LOG_TYPE)),
  collaboratorId: z.optional(z.string()),
});
