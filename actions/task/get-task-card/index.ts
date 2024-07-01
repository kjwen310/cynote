'use server';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/lib/utils';
import { GetTaskCardSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId, taskCardId } = data;

  let taskCard = null;

  try {
    taskCard = await db.taskCard.findUnique({
      where: {
        id: taskCardId,
        taskList: {
          taskBoard: {
            id: taskBoardId,
            workspaceId,
          },
        },
      },
      include: {
        taskList: true,
      },
    });
  } catch (error) {
    return { error: '[GET_TASK_CARD_ERROR]: Failed fetch' };
  }

  if (!taskCard) {
    return { error: '[GET_TASK_CARD_ERROR]: No TaskCard' };
  }

  return { data: taskCard };
};

export const getTaskCard = createSafeAction(GetTaskCardSchema, handler);
