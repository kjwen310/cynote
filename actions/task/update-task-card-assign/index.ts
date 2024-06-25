'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateTaskCardAssignSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId, taskCardId, assignedToId } = data;

  let taskCard = null;

  try {
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
        assignedToId,
      }
    });
  } catch (error) {
    return { error: '[UPDATE_TASK_CARD_ASSIGN_ERROR]: Failed update' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      upperTargetId: taskBoardId,
      targetId: taskCard.id,
      title: `assign of ${taskCard.title}`,
      action: "UPDATE",
      type: "TASK_CARD",
    });
  } catch (error) {
    return { error: '[UPDATE_TASK_CARD_ASSIGN_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskCard };
};

export const updateTaskCardAssign = createSafeAction(UpdateTaskCardAssignSchema, handler);
