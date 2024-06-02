import { z } from 'zod';
import { Workspace } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { LeaveWorkspaceSchema } from './schema';

export type InputType = z.infer<typeof LeaveWorkspaceSchema>;
export type OutputType = ActionState<InputType, Workspace>;
