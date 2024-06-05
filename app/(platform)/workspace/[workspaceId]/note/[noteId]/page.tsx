import { db } from '@/lib/db';
import { NoteEditor } from '@/components/editor/note-editor';
import { CoverImage } from './_components/cover-image';
import { NoteHeader } from './_components/note-header';

export default async function NoteIdPage({
  params,
}: {
  params: { noteId: string };
}) {
  const note = await db.note.findUnique({
    where: {
      id: params.noteId,
    },
  });

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="space-y-4 pb-8">
      <CoverImage note={note} />
      <div className="px-8">
        <NoteHeader note={note} />
        <NoteEditor dataContent={note.content} />
      </div>
    </div>
  );
}
