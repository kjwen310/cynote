'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateTaskListOrderSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId, taskBoardId, items } = data;

  let taskLists = null;

  try {
    const transaction = items.map((list) =>
      db.taskList.update({
        where: {
          id: list.id,
          taskBoard: {
            workspaceId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );
  
    taskLists = await db.$transaction(transaction);
  } catch (error) {
    return { error: '[UPDATE_TASK_LIST_ORDER]: Failed reorder' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskLists };
};

export const updateTaskListOrder = createSafeAction(UpdateTaskListOrderSchema, handler);
