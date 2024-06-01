'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateTaskCardOrderSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId, items } = data;

  let taskCards = null;

  try {
    const transaction = items.map((card) =>
      db.taskCard.update({
        where: {
          id: card.id,
          taskList: {
            taskBoard: {
              workspaceId
            }
          }
        },
        data: {
          order: card.order,
          taskListId: card.taskListId,
        }
      })
    );
  
    taskCards = await db.$transaction(transaction);
  } catch (error) {
    return { error: '[UPDATE_TASK_CARD_ORDER]: Failed reorder' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskCards };
};

export const updateTaskCardOrder = createSafeAction(UpdateTaskCardOrderSchema, handler);
