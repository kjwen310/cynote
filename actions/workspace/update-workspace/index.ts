'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateWorkspaceSchema } from './schema';

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

  const { workspaceId, title, description, image } = data;
  const [imageId, imageSmUrl, imageLgUrl] = image.split('|');

  let workspace = null;

  try {
    workspace = await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        title: title,
        description: description,
        imageId,
        imageSmUrl,
        imageLgUrl,
      },
    });
  } catch (error) {
    return { error: '[UPDATE_WORKSPACE]: Failed update' };
  }

  try {
    await createHistoryLog({
      workspaceId: workspace.id,
      targetId: workspace.id,
      title: `Settings of ${workspace.title}`,
      action: 'UPDATE',
      type: 'WORKSPACE',
    });
  } catch (error) {
    return { error: '[UPDATE_WORKSPACE_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspace.id}`);
  return { data: workspace };
};

export const updateWorkspace = createSafeAction(UpdateWorkspaceSchema, handler);
