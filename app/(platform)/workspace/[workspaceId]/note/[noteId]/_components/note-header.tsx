'use client';

import { useState, useRef, ElementRef } from 'react';
import { useParams } from 'next/navigation';
import { Note } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import { useToast } from '@/components/ui/use-toast';
import { updateNoteTitle } from '@/actions/note/update-note-title';
import { Input } from '@/components/ui/input';

interface NoteHeaderProps {
  note: Note;
  isAuthor: boolean;
}

export const NoteHeader = ({ note, isAuthor }: NoteHeaderProps) => {
  const [title, setTitle] = useState(note.title);
  const { toast } = useToast();
  const inputRef = useRef<ElementRef<'input'>>(null);

  const params = useParams();
  const { workspaceId } = params;

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const { execute } = useAction(updateNoteTitle, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Update title',
      });
      setTitle(data.title);
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const formTitle = data.get('title') as string;
    if (title === formTitle) return;

    execute({
      workspaceId: workspaceId as string,
      noteId: note.id,
      title: formTitle,
    });
  };

  return (
    <>
      {isAuthor ? (
        <form action={onSubmit} className="w-full bg-transparent my-8">
          <Input
            ref={inputRef}
            name="title"
            onBlur={onBlur}
            defaultValue={title}
            className="text-5xl text-[#3F3F3F] bg-transparent font-bold break-words outline-none border-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none dark:text-[#CFCFCF]"
          />
        </form>
      ) : (
        <div className="text-5xl text-[#3F3F3F] bg-transparent font-bold break-words py-4 dark:text-[#CFCFCF]">
          {title}
        </div>
      )}
    </>
  );
};

NoteHeader.Skeleton = function NoteHeaderSkeleton() {
  return <Skeleton className="w-24 h-6 bg-neutral-200" />;
};
