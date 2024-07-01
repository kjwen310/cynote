'use server';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils';
import { DeleteNoteSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, noteId } = data;

  let note = null;

  try {
    note = await db.note.delete({
      where: {
        id: noteId,
        workspaceId,
      },
    });
  } catch (error) {
    return { error: '[DELETE_TASK_BOARD_ERROR]: Failed delete' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      targetId: note.id,
      title: note.title,
      action: "DELETE",
      type: "NOTE",
    });
  } catch (error) {
    return { error: '[DELETE_NOTE_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}`);
  return { data: note };
};

export const deleteNote = createSafeAction(DeleteNoteSchema, handler);
