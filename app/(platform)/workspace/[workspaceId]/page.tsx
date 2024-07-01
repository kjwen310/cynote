import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ClipboardCheck, FilePenLine } from 'lucide-react';
import { Note, TaskBoard } from '@prisma/client';
import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { Separator } from '@/components/ui/separator';
import { CoverImage } from './_components/cover-image';
import { CreateBtn } from './_components/create-btn';

interface WorkspaceIdPageProps {
  params: { workspaceId: string };
}

export default async function WorkspaceIdPage({
  params,
}: WorkspaceIdPageProps) {
  const { workspaceId } = params;

  const { data } = await getCurrentUser();
  const authUser = data?.user || null;

  const user = await db.user.findUnique({
    where: {
      id: authUser?.id,
    },
  });

  if (!user || !authUser || !authUser.email) {
    redirect('/sign-in');
  }

  const collaborator = await db.collaborator.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id,
        workspaceId,
      },
    },
  });

  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    include: {
      collaborators: {
        orderBy: {
          role: 'asc',
        },
      },
      taskBoards: true,
      notes: true,
      historyLogs: true,
    },
  });

  if (!workspace || !collaborator) {
    redirect('/');
  }

  const isOwner = collaborator.role === "OWNER";

  return (
    <div className="space-y-8 pb-8">
      <CoverImage workspace={workspace} isOwner={isOwner} />

      <div className="space-y-8 px-8">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold">{workspace.title}</h1>
          <p className="text-md text-zinc-500 dark:text-zinc-300">
            {workspace.description}
          </p>
        </section>

        <Separator className="h-[2px]" />

        <section className="space-y-4">
          <div className="flex items-center gap-x-4">
            <ClipboardCheck className="w-5 h-5 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
            <h2 className="text-xl font-semibold">Task Boards</h2>
          </div>
          <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3">
            {workspace.taskBoards.map((board: TaskBoard) => (
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
            <CreateBtn type="taskBoard" />
          </div>
        </section>

        <Separator className="h-[2px]" />

        <section className="space-y-4">
          <div className="flex items-center gap-x-4">
            <FilePenLine className="w-5 h-5 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
            <h2 className="text-xl font-semibold">Notes</h2>
          </div>
          <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3">
            {workspace.notes.map((note: Note) => (
              // Need to find other solutions
              <a
                key={note.id}
                href={`/workspace/${workspaceId}/note/${note.id}`}
                style={{ backgroundImage: `url(${note.imageSmUrl})` }}
                className="relative w-full rounded-sm group aspect-video bg-no-repeat bg-cover bg-center bg-slate-700 p-2 overflow-hidden"
              >
                <div className="absolute flex justify-center items-center inset-0 transition bg-black/30 group-hover:bg-black/40">
                  <p className="relative font-semibold text-white">
                    {note.title}
                  </p>
                </div>
              </a>
            ))}
            <CreateBtn type="note" />
          </div>
        </section>
      </div>
    </div>
  );
}
