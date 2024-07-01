import { db } from '@/lib/db';
import { TaskBoardHeader } from './_components/task-board-header';
import { ListContainer } from './_components/list-container';
import { CoverImage } from './_components/cover-image';
import Loading from '@/components/loading';

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
          <ListContainer
            boardId={taskBoardId}
            list={taskBoard.taskLists}
            collaborators={collaborators}
          />
        </div>
      </div>
    </div>
  );
}
