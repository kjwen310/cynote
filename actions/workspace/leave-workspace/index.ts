'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { LeaveWorkspaceSchema } from './schema';

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

  const collaborators = await db.collaborator.findMany({
    where: {
      userId: user.id,
      workspaceId,
    },
  });

  if (collaborators?.length !== 1 || collaborators?.[0]?.role === "OWNER") {
    return { error: '[LEAVE_WORKSPACE]: Collaborator error' };
  }

  let workspace = null;

  try {
    workspace = await db.workspace.update({
      where: {
        id: workspaceId,
        collaborators: {
          some: {
            id: collaborators[0].id,
          },
        },
      },
      data: {
        collaborators: {
          deleteMany: {
            id: collaborators[0].id,
          },
        },
      },
    });
  } catch (error) {
    return { error: '[LEAVE_WORKSPACE]: Failed leave workspace' };
  }

  revalidatePath(`/workspace/${workspace.id}`);
  return { data: workspace };
};

export const leaveWorkspace = createSafeAction(LeaveWorkspaceSchema, handler);
