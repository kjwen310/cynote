'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/auth';
import { createHistoryLog } from '@/lib/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateTaskCardSchema } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { listId, workspaceId, taskBoardId, title, description } = data;

  let taskCard = null;

  try {
    const collaborator = await db.collaborator.findFirst({
      where: {
        userId: authUser.id,
        workspaceId,
      },
    });

    if (!collaborator) {
      return {
        error: '[CREATE_TASK_CARD_ERROR]: Collaborator error',
      };
    }

    const lastTaskCard = await db.taskCard.findFirst({
      where: {
        taskListId: listId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastTaskCard ? lastTaskCard.order + 1 : 1;

    taskCard = await db.taskCard.create({
      data: {
        title,
        description: description || '',
        taskListId: listId,
        order: newOrder,
        createdById: collaborator.id,
        assignedToId: collaborator.id,
      },
    });
  } catch (error) {
    return { error: '[CREATE_TASK_CARD_ERROR]: Failed create' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      targetId: taskCard.id,
      title: taskCard.title,
      action: 'CREATE',
      type: 'TASK',
    });
  } catch (error) {
    return { error: '[CREATE_TASK_CARD_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskCard };
};

export const createTaskCard = createSafeAction(CreateTaskCardSchema, handler);