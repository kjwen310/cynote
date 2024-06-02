import Link from 'next/link';
import { ClipboardCheck, FilePenLine } from 'lucide-react';
import { Note, TaskBoard } from '@prisma/client';
import { db } from '@/lib/db';
import { CreateTaskBoardBtn } from '../../_components/create-taskboard-btn';
import { Separator } from '@/components/ui/separator';

interface WorkspaceIdPageProps {
  params: { workspaceId: string };
}

export default async function WorkspaceIdPage({
  params,
}: WorkspaceIdPageProps) {
  const { workspaceId } = params;

  const taskBoardList = await db.taskBoard.findMany({
    where: { workspaceId },
  });

  const noteList = await db.note.findMany({
    where: { workspaceId },
  });

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <div className="flex items-center gap-x-4">
          <ClipboardCheck className="w-5 h-5 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
          <h2 className="text-xl font-semibold">Task Boards</h2>
        </div>
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
      </div>
      <Separator className="h-[2px]" />
      <div className="space-y-4">
        <div className="flex items-center gap-x-4">
          <FilePenLine className="w-5 h-5 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
          <h2 className="text-xl font-semibold">Notes</h2>
        </div>
        <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3">
          {noteList.map((note: Note) => (
            <Link
              key={note.id}
              href={`/workspace/${workspaceId}/note/${note.id}`}
              style={{ backgroundImage: '' }}
              className="relative w-full rounded-sm group aspect-video bg-no-repeat bg-cover bg-center bg-slate-700 p-2 overflow-hidden"
            >
              <div className="absolute flex justify-center items-center inset-0 transition bg-black/30 group-hover:bg-black/40">
                <p className="relative font-semibold text-white">
                  {note.title}
                </p>
              </div>
            </Link>
          ))}
          <div className="flex flex-col justify-center items-center gap-y-1 relative w-full bg-muted rounded-sm aspect-video transition cursor-pointer hover:opacity-75">
            <CreateTaskBoardBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
