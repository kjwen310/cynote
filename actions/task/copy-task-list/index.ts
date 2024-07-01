'use server';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { createHistoryLog } from '@/actions/historyLog/create-history-log';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/utils/create-safe-action';
import { CopyTaskListSchema } from './schema';

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
    const listToCopy = await db.taskList.findUnique({
      where: {
        id: taskListId,
        taskBoardId,
      },
      include: {
        taskCards: true,
      }
    });
  
    if (!listToCopy) {
      return {
        error: 'TASK_LIST_COPY_ERROR: list not found',
      };
    }
  
    const lastTaskList = await db.taskList.findFirst({
      where: {
        id: listToCopy.id,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });
  
    const newOrder = lastTaskList ? lastTaskList.order + 1 : 1;
  
    taskList = await db.taskList.create({
      data: {
        taskBoardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        taskCards: {
          createMany: {
            data: listToCopy.taskCards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
              createdById: card.createdById,
              assignedToId: card.assignedToId,
            }))
          }
        }
      },
    });
  } catch (error) {
    return { error: '[TASK_LIST_COPY_ERROR]: Failed copy' };
  }

  try {
    await createHistoryLog({
      workspaceId,
      upperTargetId: taskBoardId,
      targetId: taskList.id,
      title: taskList.title,
      action: "CREATE",
      type: "TASK_LIST",
    });
  } catch (error) {
    return { error: '[TASK_LIST_COPY_HISTORY]: Failed create' };
  }

  revalidatePath(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
  return { data: taskList };
};

export const copyTaskList = createSafeAction(CopyTaskListSchema, handler);
