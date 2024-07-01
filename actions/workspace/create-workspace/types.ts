import { z } from 'zod';
import { Workspace } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { CreateWorkspaceSchema } from './schema';

export type InputType = z.infer<typeof CreateWorkspaceSchema>;
export type OutputType = ActionState<InputType, Workspace>;
