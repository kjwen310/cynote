import { db } from '@/lib/prisma/db';

import Loading from '@/components/shared-ui/loading';
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
    return <Loading />;
  }

  return (
    <div className="relative w-full">
      <CoverImage taskBoard={taskBoard} />
      <div className="px-8">
        <TaskBoardHeader taskBoard={taskBoard} />
        <div className="h-full overflow-x-auto">
          <TaskListContainer
            boardId={taskBoardId}
            list={taskBoard.taskLists}
            collaborators={collaborators}
          />
        </div>
      </div>
    </div>
  );
}
