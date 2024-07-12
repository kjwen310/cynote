import { db } from '@/lib/prisma/db';

import { NotFoundContainer } from '@/components/shared-ui/not-found-container';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CoverImage } from './_components/cover-image';
import { TaskBoardHeader } from './_components/task-board-header';
import { TaskListContainer } from './_components/task-list-container';

interface TaskBoardIdPageProps {
  params: {
    workspaceId: string;
    taskBoardId: string;
  };
}

export default async function TaskBoardIdPage({
  params,
}: TaskBoardIdPageProps) {
  const { workspaceId, taskBoardId } = params;
  const taskBoard = await db.taskBoard.findUnique({
    where: {
      id: taskBoardId,
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

  const collaborators = await db.collaborator.findMany({
    where: {
      workspaceId,
    },
  });

  if (!taskBoard) {
    return (
      <div className="w-full">
        <NotFoundContainer info="Workspace is not exist" />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <CoverImage taskBoard={taskBoard} />
      <div className="px-8 h-full">
        <TaskBoardHeader taskBoard={taskBoard} />
        <ScrollArea className="w-full">
          <div className="h-full">
            <TaskListContainer
              boardId={taskBoardId}
              list={taskBoard.taskLists}
              collaborators={collaborators}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
