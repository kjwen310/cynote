'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { DeleteTaskListSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId, taskListId } = data;

  let taskList = null;

  try {
    taskList = await db.taskList.delete({
      where: {
        id: taskListId,
      },
    });
  } catch (error) {
    return { error: '[DELETE_TASK_LIST_ERROR]: Failed delete' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      upperTargetId: taskBoardId,
      targetId: taskList.id,
      title: taskList.title,
      action: "DELETE",
      type: "TASK_LIST",
    });
  } catch (error) {
    return { error: '[DELETE_TASK_LIST_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskList };
};

export const deleteTaskList = createSafeAction(DeleteTaskListSchema, handler);
