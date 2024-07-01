import { z } from 'zod';
import { Note } from '@prisma/client';
import { ActionState } from '@/types';
import { CreateNoteSchema } from './schema';

export type InputType = z.infer<typeof CreateNoteSchema>;
export type OutputType = ActionState<InputType, Note>;
