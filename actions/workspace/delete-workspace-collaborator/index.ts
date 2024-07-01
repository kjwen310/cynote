'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils';
import { DeleteWorkspaceCollaboratorSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;
  const { workspaceId, collaboratorId } = data;

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

  const collaborator = await db.collaborator.findUnique({
    where: {
      userId_workspaceId: {
        userId: authUser.id,
        workspaceId,
      },
    },
  });

  if (!user || !collaborator) {
    redirect('/sign-in');
  }

  let workspace = null;

  try {
    workspace = await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        collaborators: {
          deleteMany: {
            id: collaboratorId,
          },
        },
      },
    });
  } catch (error) {
    return { error: '[DELETE_WORKSPACE_COLLABORATOR]: Failed delete' };
  }

  try {
    await createHistoryLog({
      workspaceId: workspace.id,
      targetId: workspace.id,
      title: `Collaborator of ${workspace.title}`,
      action: 'UPDATE',
      type: 'WORKSPACE',
    });
  } catch (error) {
    return { error: '[DELETE_WORKSPACE_COLLABORATOR_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}`);
  return { data: workspace };
};

export const deleteWorkspaceCollaborator = createSafeAction(
  DeleteWorkspaceCollaboratorSchema,
  handler
);
