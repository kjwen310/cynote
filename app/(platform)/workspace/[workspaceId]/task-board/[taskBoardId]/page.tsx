import { db } from '@/lib/db';
import { TaskBoardHeader } from './_components/task-board-header';
import { ListContainer } from './_components/list-container';
import { CoverImage } from './_components/cover-image';

interface TaskBoardIdPageProps {
  params: { taskBoardId: string };
}

export default async function TaskBoardIdPage({
  params,
}: TaskBoardIdPageProps) {
  const { taskBoardId } = params;
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

  if (!taskBoard) {
    return <div>No Board Data</div>;
  }

  return (
    <div className="relative w-full">
      <CoverImage taskBoard={taskBoard} />
      <div className="px-8">
        <TaskBoardHeader taskBoard={taskBoard} />
        <div className="h-full overflow-x-auto">
          <ListContainer boardId={taskBoardId} list={taskBoard.taskLists} />
        </div>
      </div>
    </div>
  );
}
