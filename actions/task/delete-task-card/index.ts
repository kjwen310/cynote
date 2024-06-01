'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth';
import { createHistoryLog } from '@/lib/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { DeleteTaskCardSchema } from './schema';

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
    taskCard = await db.taskCard.delete({
      where: {
        id: taskCardId,
        taskList: {
          taskBoard: {
            workspaceId,
          }
        }
      },
    });
  } catch (error) {
    return { error: '[DELETE_TASK_CARD_ERROR]: Failed delete' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      targetId: taskCard.id,
      title: taskCard.title,
      action: "DELETE",
      type: "TASK",
    });
  } catch (error) {
    return { error: '[DELETE_TASK_CARD_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskCard };
};

export const deleteTaskCard = createSafeAction(DeleteTaskCardSchema, handler);