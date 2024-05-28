import Link from 'next/link';
import { TaskBoard } from '@prisma/client';
import { db } from '@/lib/db';
import { CreateTaskBoardBtn } from '../../_components/create-taskboard-btn';

interface WorkspaceIdPageProps {
  params: { workspaceId: string };
}

export default async function WorkspaceIdPage({
  params,
}: WorkspaceIdPageProps) {
  const { workspaceId } = params;
  const taskBoardList = await db.taskBoard.findMany({
    where: {
      workspaceId,
    },
  });

  return (
    <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3">
      {taskBoardList.map((board: TaskBoard) => (
        <Link
          key={board.id}
          href={`/workspace/${workspaceId}/task-board/${board.id}`}
          style={{ backgroundImage: `url(${board.imageSmUrl})` }}
          className="relative w-full rounded-sm group aspect-video bg-no-repeat bg-cover bg-center bg-slate-700 p-2 overflow-hidden"
        >
          <div className="absolute flex justify-center items-center inset-0 transition bg-black/30 group-hover:bg-black/40">
            <p className="relative font-semibold text-white">
              {board.title}
            </p>
          </div>
        </Link>
      ))}
      <div className="flex flex-col justify-center items-center gap-y-1 relative w-full bg-muted rounded-sm aspect-video transition cursor-pointer hover:opacity-75">
        <CreateTaskBoardBtn />
      </div>
    </div>
  );
}
