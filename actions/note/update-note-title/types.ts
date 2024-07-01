import { z } from 'zod';
import { Note } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateNoteTitleSchema } from './schema';

export type InputType = z.infer<typeof UpdateNoteTitleSchema>;
export type OutputType = ActionState<InputType, Note>;
