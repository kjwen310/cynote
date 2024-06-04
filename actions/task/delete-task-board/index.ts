'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/lib/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { DeleteTaskBoardSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId } = data;

  let taskBoard = null;

  try {
    taskBoard = await db.taskBoard.delete({
      where: {
        id: taskBoardId,
        workspaceId,
      },
    });
  } catch (error) {
    return { error: '[DELETE_TASK_BOARD_ERROR]: Failed delete' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      targetId: taskBoard.id,
      title: taskBoard.title,
      action: "DELETE",
      type: "TASK",
    });
  } catch (error) {
    return { error: '[DELETE_TASK_BOARD_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}`);
  return { data: taskBoard };
};

export const deleteTaskBoard = createSafeAction(DeleteTaskBoardSchema, handler);
