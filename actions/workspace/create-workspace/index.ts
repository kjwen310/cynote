'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
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
  const [imageId, imageSmUrl, imageLgUrl] = image.split('|');

  let workspace = null;

  try {
    workspace = await db.workspace.create({
      data: {
        title: title,
        description: description,
        imageId,
        imageSmUrl,
        imageLgUrl,
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

  try {
    await createHistoryLog({
      workspaceId: workspace.id,
      targetId: workspace.id,
      title: workspace.title,
      action: 'CREATE',
      type: 'WORKSPACE',
    });
  } catch (error) {
    return { error: '[CREATE_WORKSPACE_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspace.id}`);
  return { data: workspace };
};

export const createWorkspace = createSafeAction(CreateWorkspaceSchema, handler);
