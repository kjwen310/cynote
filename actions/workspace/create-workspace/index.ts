'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateWorkspaceSchema } from './schema';

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

  const { title, description, image } = data;

  let workspace = null;

  try {
    workspace = await db.workspace.create({
      data: {
        title: title,
        description: description,
        image: image || '',
        collaborators: {
          create: [
            {
              displayName: user.name || '',
              displayImage: user.avatarImg || '',
              role: 'OWNER',
              userId: user.id,
            },
          ],
        },
      },
    });
  } catch (error) {
    return { error: '[CREATE_WORKSPACE]: Failed create' };
  }

  revalidatePath(`/workspace/${workspace.id}`);
  return { data: workspace };
};

export const createWorkspace = createSafeAction(CreateWorkspaceSchema, handler);
