import { z } from 'zod';
import { Workspace } from '@prisma/client';
import { ActionState } from '@/types';
import { DeleteWorkspaceCollaboratorSchema } from './schema';

export type InputType = z.infer<typeof DeleteWorkspaceCollaboratorSchema>;
export type OutputType = ActionState<InputType, Workspace>;
