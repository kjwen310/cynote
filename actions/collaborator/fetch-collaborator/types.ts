import { z } from 'zod';
import { Collaborator } from '@prisma/client';
import { ActionState } from '@/types';
import { FetchCollaboratorSchema } from './schema';

export type InputType = z.infer<typeof FetchCollaboratorSchema>;
export type OutputType = ActionState<InputType, Collaborator[]>;
