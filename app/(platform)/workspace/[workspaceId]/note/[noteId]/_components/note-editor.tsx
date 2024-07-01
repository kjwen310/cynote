'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { PartialBlock } from '@blocknote/core';

import { useAction } from '@/hooks/use-action';
import { updateNoteContent } from '@/actions/note/update-note-content';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import Loading from '@/components/shared-ui/loading';

const Editor = dynamic(() => import('@/components/shared-ui/editor'), {
  ssr: false,
});

interface NoteEditorProps {
  dataContent: string;
  isAuthor: boolean;
}

export default function NoteEditor({ dataContent, isAuthor }: NoteEditorProps) {
  const [editorContent, setEditorContent] = useState<PartialBlock[]>([]);
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined
  >([]);

  const { toast } = useToast();
  const params = useParams();
  const { workspaceId, noteId } = params;

  useEffect(() => {
    const content = JSON.parse(dataContent)?.length
      ? JSON.parse(dataContent)
      : undefined;
    setInitialContent(content);
  }, [dataContent]);

  const { execute, isLoading } = useAction(updateNoteContent, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: `Successfully Updated content`,
      });
    },
  });

  const onUpdateContent = () => {
    if (!workspaceId || !noteId || !editorContent || isLoading) return;
    const content = JSON.stringify(editorContent);

    execute({
      workspaceId: workspaceId as string,
      noteId: noteId as string,
      content,
    });
  };

  const onChange = (blockContent: PartialBlock[]) => {
    if (!blockContent) return;
    setEditorContent(blockContent);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Editor
        initialContent={initialContent}
        onChange={onChange}
        editable={isAuthor && !isLoading}
      />
      {isAuthor && (
        <div className="fixed bottom-0 right-0 flex justify-end p-8">
          <Button
            variant="outline"
            size="lg"
            disabled={isLoading}
            onClick={onUpdateContent}
            className="shadow-md"
          >
            Save
          </Button>
        </div>
      )}
    </>
  );
}
