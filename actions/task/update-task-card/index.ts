'use server';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils';
import { UpdateTaskCardSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId, taskCardId, title, description } = data;

  let taskCard = null;

  try {
    const taskBoard = db.taskBoard.findUnique({
      where: {
        id: taskBoardId,
      },
    });

    if (!taskBoard) {
      return {
        error: '[UPDATE_TASK_LIST_ERROR]: TaskBoard not found',
      };
    }

    taskCard = await db.taskCard.update({
      where: {
        id: taskCardId,
        taskList: {
          taskBoard: {
            id: taskBoardId,
            workspaceId,
          }
        }
      },
      data: {
        title,
        description,
      }
    });
  } catch (error) {
    return { error: '[UPDATE_TASK_CARD_ERROR]: Failed update' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      upperTargetId: taskBoardId,
      targetId: taskCard.id,
      title: taskCard.title,
      action: "UPDATE",
      type: "TASK_CARD",
    });
  } catch (error) {
    return { error: '[UPDATE_TASK_CARD_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskCard };
};

export const updateTaskCard = createSafeAction(UpdateTaskCardSchema, handler);
