'use server';

import { v4 as uuidV4 } from "uuid";
import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from "@/actions/historyLog/create-history-log";
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils';
import { RefreshInviteCodeSchema } from './schema';

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

  let workspace = null;

  try {
    workspace = await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        inviteCode: uuidV4(),
      },
    });
  } catch (error) {
    return { error: '[REFRESH_INVITE_CODE]: Failed refresh' };
  }

  try {
    await createHistoryLog({
      workspaceId: workspace.id,
      targetId: workspace.id,
      title: `Invite code of ${workspace.title}`,
      action: 'UPDATE',
      type: 'WORKSPACE',
    });
  } catch (error) {
    return { error: '[UPDATE_WORKSPACE_INVITE_CODE_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspace.id}`);
  return { data: workspace };
};

export const refreshInviteCode = createSafeAction(RefreshInviteCodeSchema, handler);
