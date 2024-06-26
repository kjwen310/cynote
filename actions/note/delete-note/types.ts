import { z } from 'zod';
import { Note } from '@prisma/client';
import { ActionState } from '@/types';
import { DeleteNoteSchema } from './schema';

export type InputType = z.infer<typeof DeleteNoteSchema>;
export type OutputType = ActionState<InputType, Note>;
