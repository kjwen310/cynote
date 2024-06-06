'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateTaskBoardSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, title, image } = data;
  const [imageId, imageSmUrl, imageLgUrl] = image.split('|');

  let taskBoard = null;

  try {
    taskBoard = await db.taskBoard.create({
      data: {
        workspaceId: workspaceId,
        title: title,
        imageId,
        imageSmUrl,
        imageLgUrl,
      },
    });
  } catch (error) {
    return { error: '[CREATE_TASK_BOARD]: Failed create' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      targetId: taskBoard.id,
      title: taskBoard.title,
      action: 'CREATE',
      type: 'TASK_BOARD',
    });
  } catch (error) {
    return { error: '[CREATE_TASK_BOARD_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/task-board/${taskBoard.id}`);
  return { data: taskBoard };
};

export const createTaskBoard = createSafeAction(CreateTaskBoardSchema, handler);
