'use server';

import { db } from '@/lib/db';

export async function createTaskBoard(data: {
  workspaceId: string;
  title: string;
  image: string;
}) {
  const workspace = await db.workspace.findUnique({
    where: {
      id: data.workspaceId,
    },
  });

  console.log('test', data);

  if (!workspace) {
    return JSON.stringify({
      error: 'ERROR_CREATE_TASK_BOARD: workspace not found',
    });
  }

  const [imageId, imageSmUrl, imageLgUrl] = data.image.split('|');

  if (!imageId || !imageSmUrl || !imageLgUrl) {
    return JSON.stringify({
      error: `ERROR_CREATE_TASK_BOARD: image infos error, ${data.image}`,
    });
  }

  const taskBoard = await db.taskBoard.create({
    data: {
      workspaceId: workspace.id,
      title: data.title,
      imageId,
      imageSmUrl,
      imageLgUrl,
    },
  });

  await db.workspace.update({
    where: {
      id: workspace.id,
    },
    data: {
      taskBoards: {
        connect: {
          id: taskBoard.id,
        },
      },
    },
  });

  return JSON.stringify(taskBoard.id);
}

export async function fetchAllTaskBoards(data: { workspaceId: string }) {
  const { workspaceId } = data;

  if (!workspaceId) {
    return JSON.stringify({
      error: 'FETCH_TASK_BOARD_ERROR',
    });
  }

  const taskBoardList = await db.taskBoard.findMany({
    where: {
        workspaceId,
    },
  });

  return JSON.stringify(taskBoardList);
}
