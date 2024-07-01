'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils/create-safe-action';
import { CreateNoteSchema } from './schema';

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

  const { workspaceId, title, image } = data;
  const [imageId, imageSmUrl, imageLgUrl] = image.split('|');

  const collaborator = await db.collaborator.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id,
        workspaceId,
      },
    },
  });

  if (!user || !collaborator) {
    redirect('/sign-in');
  }

  let note = null;

  try {
    note = await db.note.create({
      data: {
        title,
        content: JSON.stringify([]),
        imageId,
        imageSmUrl,
        imageLgUrl,
        workspaceId,
        authorId: collaborator.id,
      },
    });
  } catch (error) {
    return { error: '[CREATE_NOTE]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/note/${note.id}`);
  return { data: note };
};

export const createNote = createSafeAction(CreateNoteSchema, handler);
