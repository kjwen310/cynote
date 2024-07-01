import { z } from 'zod';
import { Note } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateNoteContentSchema } from './schema';

export type InputType = z.infer<typeof UpdateNoteContentSchema>;
export type OutputType = ActionState<InputType, Note>;
