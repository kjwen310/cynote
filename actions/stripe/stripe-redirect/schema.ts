import { z } from 'zod';

export const StripeRedirectSchema = z.object({
  workspaceId: z.string(),
});
