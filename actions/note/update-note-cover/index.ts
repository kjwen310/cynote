'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils';
import { UpdateNoteCoverSchema } from './schema';

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

  const { workspaceId, noteId, image } = data;
  const [imageId, imageSmUrl, imageLgUrl] = image.split('|');

  let note = null;

  try {
    note = await db.note.update({
      where: {
        id: noteId,
        workspaceId,
      },
      data: {
        imageId,
        imageSmUrl,
        imageLgUrl,
      },
    });
  } catch (error) {
    return { error: '[UPDATE_NOTE_COVER]: Failed update' };
  }

  revalidatePath(`/workspace/${workspaceId}/note/${noteId}`);
  return { data: note };
};

export const updateNoteCover = createSafeAction(UpdateNoteCoverSchema, handler);
