'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils/create-safe-action';
import { UpdateTaskBoardTitleSchema } from './schema';

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

  const { workspaceId, taskBoardId, title } = data;

  let taskBoard = null;

  try {
    taskBoard = await db.taskBoard.update({
      where: {
        id: taskBoardId,
        workspaceId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return { error: '[UPDATE_TASK_BOARD_TITLE]: Failed update' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      targetId: taskBoard.id,
      title: `Title of ${taskBoard.title}`,
      action: 'UPDATE',
      type: 'TASK_BOARD',
    });
  } catch (error) {
    return { error: '[UPDATE_TASK_BOARD_TITLE_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskBoard };
};

export const updateTaskBoardTitle = createSafeAction(
  UpdateTaskBoardTitleSchema,
  handler
);
