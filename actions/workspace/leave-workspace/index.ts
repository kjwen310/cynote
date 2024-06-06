'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
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

  const collaborator = await db.collaborator.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id,
        workspaceId,
      },
    },
  });

  if (!collaborator || collaborator.role === "OWNER") {
    return { error: '[LEAVE_WORKSPACE]: Collaborator error' };
  }

  let workspace = null;

  try {
    workspace = await db.workspace.update({
      where: {
        id: workspaceId,
        collaborators: {
          some: {
            id: collaborator.id,
          },
        },
      },
      data: {
        collaborators: {
          deleteMany: {
            id: collaborator.id,
          },
        },
      },
    });
  } catch (error) {
    return { error: '[LEAVE_WORKSPACE]: Failed leave workspace' };
  }

  try {
    await createHistoryLog({
      workspaceId: workspace.id,
      targetId: workspace.id,
      title: `${collaborator.displayName} left ${workspace.title}`,
      action: "UPDATE",
      type: "WORKSPACE",
    });
  } catch (error) {
    return { error: '[UPDATE_WORKSPACE_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspace.id}`);
  return { data: workspace };
};

export const leaveWorkspace = createSafeAction(LeaveWorkspaceSchema, handler);
