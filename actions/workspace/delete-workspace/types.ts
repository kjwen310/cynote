import { z } from 'zod';
import { Workspace } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { DeleteWorkspaceSchema } from './schema';

export type InputType = z.infer<typeof DeleteWorkspaceSchema>;
export type OutputType = ActionState<InputType, Workspace>;
