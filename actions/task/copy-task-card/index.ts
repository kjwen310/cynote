'use server';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils/create-safe-action';
import { CopyTaskCardSchema } from './schema';

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
    const cardToCopy = await db.taskCard.findUnique({
      where: {
        id: taskCardId,
        taskList: {
          taskBoard: {
            workspaceId,
          }
        }
      },
    });
  
    if (!cardToCopy) {
      return {
        error: 'TASK_CARD_COPY_ERROR: card not found',
      };
    }
  
    const lastTaskCard = await db.taskCard.findFirst({
      where: {
        taskListId: cardToCopy.taskListId,
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
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        taskListId: cardToCopy.taskListId,
        createdById: cardToCopy.createdById,
        assignedToId: cardToCopy.assignedToId,
      },
    });
  } catch (error) {
    return { error: '[TASK_CARD_COPY_ERROR]: Failed copy' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      upperTargetId: taskBoardId,
      targetId: taskCard.id,
      title: taskCard.title,
      action: "CREATE",
      type: "TASK_CARD",
    });
  } catch (error) {
    return { error: '[TASK_CARD_COPY_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskCard };
};

export const copyTaskCard = createSafeAction(CopyTaskCardSchema, handler);
