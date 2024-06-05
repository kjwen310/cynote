'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateNoteContentSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    redirect('/sign-in');
  }

  const { workspaceId, noteId, content } = data;

  let note = null;

  try {
    note = await db.note.update({
      where: {
        id: noteId,
        workspaceId,
      },
      data: {
        content,
      },
    });
  } catch (error) {
    return { error: '[UPDATE_NOTE_CONTENT]: Failed update' };
  }

  revalidatePath(`/workspace/${workspaceId}/note/${noteId}`);
  return { data: note };
};

export const updateNoteContent = createSafeAction(UpdateNoteContentSchema, handler);
