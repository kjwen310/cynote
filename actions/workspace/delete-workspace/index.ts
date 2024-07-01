'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/lib/utils/create-safe-action';
import { DeleteWorkspaceSchema } from './schema';

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

  const { workspaceId } = data;

  const collaborator = await db.collaborator.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id,
        workspaceId,
      },
    },
  });

  if (!collaborator || collaborator.role !== 'OWNER') {
    return { error: '[LEAVE_WORKSPACE]: Collaborator error' };
  }

  let workspace = null;

  try {
    workspace = await db.workspace.delete({
      where: {
        id: workspaceId,
        collaborators: {
          some: {
            id: collaborator.id,
          },
        },
      },
    });
  } catch (error) {
    return { error: '[DELETE_WORKSPACE]: Failed delete workspace' };
  }

  try {
    await createHistoryLog({
      workspaceId: workspace.id,
      targetId: workspace.id,
      title: workspace.title,
      action: 'DELETE',
      type: 'WORKSPACE',
    });
  } catch (error) {
    return { error: '[DELETE_WORKSPACE_HISTORY]: Failed create' };
  }

  revalidatePath('/workspace');
  return { data: workspace };
};

export const deleteWorkspace = createSafeAction(DeleteWorkspaceSchema, handler);
