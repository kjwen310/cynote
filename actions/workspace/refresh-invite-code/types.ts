import { z } from 'zod';
import { Workspace } from '@prisma/client';
import { ActionState } from '@/lib/utils/create-safe-action';
import { RefreshInviteCodeSchema } from './schema';

export type InputType = z.infer<typeof RefreshInviteCodeSchema>;
export type OutputType = ActionState<InputType, Workspace>;
