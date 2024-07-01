import { z } from 'zod';
import { Workspace } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateWorkspaceSchema } from './schema';

export type InputType = z.infer<typeof UpdateWorkspaceSchema>;
export type OutputType = ActionState<InputType, Workspace>;
