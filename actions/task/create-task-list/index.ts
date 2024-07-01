'use server';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils';
import { CreateTaskListSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId, title } = data;

  let taskList = null;

  try {
    const taskBoard = db.taskBoard.findUnique({
      where: {
        id: taskBoardId,
      },
    });

    if (!taskBoard) {
      return {
        error: '[CREATE_TASK_LIST_ERROR]: TaskBoard not found',
      };
    }

    const lastTaskList = await db.taskList.findFirst({
      where: {
        taskBoardId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastTaskList ? lastTaskList.order + 1 : 1;

    taskList = await db.taskList.create({
      data: {
        title,
        taskBoardId,
        order: newOrder,
      },
    });
  } catch (error) {
    return { error: '[CREATE_TASK_LIST_ERROR]: Failed create' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      upperTargetId: taskBoardId,
      targetId: taskList.id,
      title: taskList.title,
      action: 'CREATE',
      type: 'TASK_LIST',
    });
  } catch (error) {
    return { error: '[CREATE_TASK_LIST_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskList };
};

export const createTaskList = createSafeAction(CreateTaskListSchema, handler);
