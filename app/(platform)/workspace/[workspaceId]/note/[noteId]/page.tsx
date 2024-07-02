import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';

import { NotFoundContainer } from '@/components/shared-ui/not-found-container';
import { CoverImage } from './_components/cover-image';
import { NoteHeader } from './_components/note-header';

const NoteEditor = dynamic(
  () =>
    import(
      '@/app/(platform)/workspace/[workspaceId]/note/[noteId]/_components/note-editor'
    ),
  {
    ssr: false,
  }
);

interface NoteIdPageProps {
  params: { workspaceId: string; noteId: string };
}

export default async function NoteIdPage({ params }: NoteIdPageProps) {
  const { workspaceId, noteId } = params;

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

  const note = await db.note.findUnique({
    where: {
      id: noteId,
      workspaceId,
    },
  });

  const collaborator = await db.collaborator.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id,
        workspaceId,
      },
    },
  });

  if (!note || !collaborator) {
    return (
      <div className="w-full">
        <NotFoundContainer info="Note is not exist" />
      </div>
    );
  }

  const isAuthor = collaborator?.id === note?.authorId;

  return (
    <div className="space-y-4 pb-8">
      <CoverImage note={note} isAuthor={isAuthor} />
      <div className="px-8">
        <NoteHeader note={note} isAuthor={isAuthor} />
        <NoteEditor dataContent={note.content} isAuthor={isAuthor} />
      </div>
    </div>
  );
}
