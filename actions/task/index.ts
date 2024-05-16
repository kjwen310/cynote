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
      error: 'FETCH_TASK_BOARDS_ERROR',
    });
  }

  const taskBoardList = await db.taskBoard.findMany({
    where: {
      workspaceId,
    },
  });

  return JSON.stringify(taskBoardList);
}

export async function fetchBoard(data: { boardId: string }) {
  const { boardId } = data;

  if (!boardId) {
    return JSON.stringify({
      error: 'FETCH_TASK_BOARD_ERROR',
    });
  }

  const taskBoard = await db.taskBoard.findUnique({
    where: {
      id: boardId,
    },
    include: {
      taskLists: {
        orderBy: {
          order: 'asc',
        },
        include: {
          taskCards: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
  });

  return JSON.stringify(taskBoard);
}

export async function createTaskList(data: { title: string; boardId: string }) {
  const { title, boardId } = data;

  const board = db.taskBoard.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return JSON.stringify({
      error: 'CREATE_TASK_LIST_ERROR',
    });
  }

  const lastTaskList = await db.taskList.findFirst({
    where: {
      taskBoardId: boardId,
    },
    orderBy: {
      order: 'desc',
    },
    select: {
      order: true,
    },
  });

  const newOrder = lastTaskList ? lastTaskList.order + 1 : 1;

  const taskList = await db.taskList.create({
    data: {
      title,
      taskBoardId: boardId,
      order: newOrder,
    },
  });

  return JSON.stringify(taskList);
}
