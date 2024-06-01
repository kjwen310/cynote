'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/lib/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateTaskListSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId, taskListId, title } = data;

  let taskList = null;

  try {
    taskList = await db.taskList.update({
      where: {
        id: taskListId,
        taskBoardId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return { error: '[UPDATE_TASK_LIST_ERROR]: Failed update' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      targetId: taskList.id,
      title: taskList.title,
      action: 'UPDATE',
      type: 'TASK',
    });
  } catch (error) {
    return { error: '[UPDATE_TASK_LIST_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskList };
};

export const updateTaskList = createSafeAction(UpdateTaskListSchema, handler);
