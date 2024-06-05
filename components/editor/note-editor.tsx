'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PartialBlock } from '@blocknote/core';
import { useAction } from '@/hooks/use-action';
import { useToast } from '@/components/ui/use-toast';
import { updateNoteContent } from '@/actions/note/update-note-content';
import { Button } from '@/components/ui/button';

const Editor = dynamic(() => import('@/components/editor/editor'), {
  ssr: false,
});

interface NoteEditorProps {
  dataContent: string;
}

const defaultContent = [
  {
    type: 'paragraph',
    content: 'Welcome! Try type something...',
  },
];

export const NoteEditor = ({ dataContent }: NoteEditorProps) => {
  const [editorContent, setEditorContent] = useState<PartialBlock[]>([]);
  const [initialContent, setInitialContent] = useState<PartialBlock[]>([]);

  const initRender = useRef(true);
  const { toast } = useToast();

  const params = useParams();
  const { workspaceId, noteId } = params;

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      const content = JSON.parse(dataContent)?.length
        ? JSON.parse(dataContent)
        : defaultContent;
      setInitialContent(content);
    }
  }, []);

  const { execute, isLoading } = useAction(updateNoteContent, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully Updated content for ${data.title}`,
      });
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
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

  return (
    <div>
      <Editor
        initialContent={initialContent}
        onChange={onChange}
        editable={!isLoading}
      />
      <div className="fixed bottom-0 right-0 flex justify-end p-8">
        <Button variant="outline" size="lg" disabled={isLoading || !initialContent?.length} onClick={onUpdateContent} className='shadow-md'>
          Save
        </Button>
      </div>
    </div>
  );
};
