import Image from 'next/image';
import { db } from '@/lib/db';
import { BoardNavbar } from './_components/board-navbar';
import { ListContainer } from './_components/list-container';

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
    return (
      <div>No Board Data</div>
    )
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full h-60">
        <Image
          src={taskBoard.imageLgUrl}
          className="object-cover"
          fill
          alt="image"
        />
      </div>
      <BoardNavbar board={taskBoard} />
      <div className="h-full overflow-x-auto p-4">
        <ListContainer
          boardId={taskBoardId}
          list={taskBoard.taskLists}
        />
      </div>
    </div>
  );
}
