'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { TaskCard, TaskList } from '@prisma/client';
import { getCurrentUser } from '@/actions/auth';
import { revalidatePath } from 'next/cache';

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

export async function updateTaskList(data: {
  title: string;
  boardId: string;
  taskListId: string;
}) {
  const { title, boardId, taskListId } = data;

  const board = db.taskBoard.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return JSON.stringify({
      error: 'UPDATE_TASK_LIST_ERROR',
    });
  }

  const taskList = await db.taskList.update({
    where: {
      id: taskListId,
    },
    data: {
      title,
    },
  });

  return JSON.stringify(taskList);
}

export async function deleteTaskList(data: { taskListId: string }) {
  const { taskListId } = data;

  const taskList = await db.taskList.delete({
    where: {
      id: taskListId,
    },
  });

  return JSON.stringify(taskList);
}

export async function createTaskCard(data: {
  title: string;
  description?: string;
  workspaceId: string;
  listId: string;
}) {
  const { title, listId, workspaceId } = data;

  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser || !authUser.email) {
    redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    redirect('/sign-in');
  }

  const collaborators = await db.collaborator.findMany({
    where: {
      userId: user.id,
      workspaceId,
    },
  });

  if (!collaborators || collaborators.length > 1) {
    return JSON.stringify({
      error: 'CREATE_TASK_CARD_ERROR:collaborator error',
    });
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

  const taskCard = await db.taskCard.create({
    data: {
      title,
      description: '',
      taskListId: listId,
      order: newOrder,
      createdById: collaborators[0].id,
      assignedToId: collaborators[0].id,
    },
  });

  return JSON.stringify(taskCard);
}

export async function updateTaskListOrder(data: {
  items: TaskList[];
  boardId: string;
  workspaceId: string;
}) {
  const { items, workspaceId } = data;
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

  const lists = await db.$transaction(transaction);
  return JSON.stringify(lists);
}

export async function updateTaskCardOrder(data: {
  items: TaskCard[];
  workspaceId: string;
}) {
  const { items, workspaceId } = data;
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

  const cards = await db.$transaction(transaction);

  return JSON.stringify(cards);
}

export async function updateTaskCard(data: {
  cardId: string;
  workspaceId: string;
  title?: string;
  description?: string;
}) {
  const { cardId, workspaceId, title, description } = data;

  const card = await db.taskCard.update({
    where: {
      id: cardId,
      taskList: {
        taskBoard: {
          workspaceId
        }
      }
    },
    data: {
      title,
      description,
    }
  });

  return JSON.stringify(card);
}

export async function copyTaskCard(data: {
  cardId: string;
  workspaceId: string;
}) {
  const { cardId, workspaceId } = data;

  const cardToCopy = await db.taskCard.findUnique({
    where: {
      id: cardId,
      taskList: {
        taskBoard: {
          workspaceId,
        }
      }
    },
  });

  if (!cardToCopy) {
    return JSON.stringify({
      error: 'COPY_TASK_CARD_ERROR:card not found',
    });
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

  const taskCard = await db.taskCard.create({
    data: {
      title: `${cardToCopy.title} - Copy`,
      description: cardToCopy.description,
      order: newOrder,
      taskListId: cardToCopy.taskListId,
      createdById: cardToCopy.createdById,
      assignedToId: cardToCopy.assignedToId,
    },
  });

  return JSON.stringify(taskCard);
}

export async function deleteTaskCard(data: {
  cardId: string;
  workspaceId: string;
}) {
  const { cardId, workspaceId } = data;

  const cardToDelete = await db.taskCard.delete({
    where: {
      id: cardId,
      taskList: {
        taskBoard: {
          workspaceId,
        }
      }
    },
  });

  if (!cardToDelete) {
    return JSON.stringify({
      error: 'DELETE_TASK_CARD_ERROR:card not found',
    });
  }

  return JSON.stringify(cardToDelete);
}
