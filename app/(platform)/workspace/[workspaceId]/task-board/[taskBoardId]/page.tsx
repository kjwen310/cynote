import { fetchBoard } from '@/actions/task';
import Image from 'next/image';
import { BoardNavbar } from './_components/board-navbar';
import { ListContainer } from './_components/list-container';

interface TaskBoardIdPageProps {
  params: { taskBoardId: string };
}

export default async function TaskBoardIdPage({
  params,
}: TaskBoardIdPageProps) {
  const { taskBoardId } = params;
  const boardData = await fetchBoard({ boardId: taskBoardId });
  const board = JSON.parse(boardData);

  const { taskLists } = board;

  return (
    <div className="relative w-full">
      <div className="relative w-full h-60">
        <Image
          src={board.imageLgUrl}
          className="object-cover"
          fill
          alt="image"
        />
      </div>
      <BoardNavbar board={board} />
      <div className="h-full overflow-x-auto p-4">
        <ListContainer
          boardId={taskBoardId}
          list={taskLists}
        />
      </div>
    </div>
  );
}
