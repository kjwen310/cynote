'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils';
import { FetchHistoryLogSchema } from './schema';
import { LOG_TYPE } from '@prisma/client';

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

  const { workspaceId, collaboratorId, type, page } = data;
  const per = 10;
  let result = [];

  try {
    result = await db.$transaction([
      db.historyLog.findMany({
        where: {
          workspaceId,
          ...(collaboratorId && { collaboratorId }),
          ...(type && { type: type as LOG_TYPE }),
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * per,
        take: per,
      }),
      db.historyLog.count({
        where: {
          workspaceId,
          ...(collaboratorId && { collaboratorId }),
          ...(type && { type: type as LOG_TYPE }),
        },
      }),
    ]);
  } catch (error) {
    return { error: '[FETCH_HISTORY_LOGS]: Failed fetch' };
  }

  revalidatePath(`/workspace/${workspaceId}/activity`);
  return {
    data: {
      data: result[0],
      count: result[1],
    },
  };
};

export const fetchHistoryLog = createSafeAction(FetchHistoryLogSchema, handler);
