import { z } from 'zod';
import { Workspace } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { UpdateWorkspaceCollaboratorSchema } from './schema';

export type InputType = z.infer<typeof UpdateWorkspaceCollaboratorSchema>;
export type OutputType = ActionState<InputType, Workspace>;
