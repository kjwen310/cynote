'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { GetHistoryLogByCardSchema } from './schema';

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

  const { workspaceId, taskBoardId, taskCardId } = data;
  let historyLogs = [];

  try {
    historyLogs = await db.historyLog.findMany({
      where: {
        workspaceId,
        targetId: taskCardId,
        upperTargetId: taskBoardId,
      },
    })
  } catch (error) {
    return { error: '[GET_HISTORY_LOG_BY_CARD]: Failed fetch' };
  }

  return {
    data: historyLogs
  };
};

export const getHistoryLogByCard = createSafeAction(GetHistoryLogByCardSchema, handler);
