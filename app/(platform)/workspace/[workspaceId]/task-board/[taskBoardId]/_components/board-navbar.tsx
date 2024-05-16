import { TaskBoard } from '@prisma/client';
import { BoardTitleForm } from './board-title-form';

interface BoardNavbarProps {
  board: TaskBoard;
}

export const BoardNavbar = ({ board }: BoardNavbarProps) => {
  return (
    <div className="flex items-center gap-x-4 w-full h-14 z-[30] bg-black/50 text-white px-6">
      <BoardTitleForm board={board} />
    </div>
  );
};
