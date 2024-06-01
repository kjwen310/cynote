'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
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

  const collaborators = await db.collaborator.findMany({
    where: {
      userId: user?.id,
      workspaceId,
    },
  });

  if (!user || collaborators?.length !== 1) {
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
          }
        }
      },
    });
  } catch (error) {
    return { error: '[DELETE_WORKSPACE]: Failed delete' };
  }

  revalidatePath(`/workspace/${workspaceId}`);
  return { data: workspace };
};

export const deleteWorkspaceCollaborator = createSafeAction(DeleteWorkspaceCollaboratorSchema, handler);
