import { z } from 'zod';
import { Note } from '@prisma/client';
import { ActionState } from '@/types';
import { UpdateNoteCoverSchema } from './schema';

export type InputType = z.infer<typeof UpdateNoteCoverSchema>;
export type OutputType = ActionState<InputType, Note>;
