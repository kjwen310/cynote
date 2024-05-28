import { z } from 'zod';

export const CreateWorkspaceSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Title is required' }),
  image: z.optional(z.string()),
});
