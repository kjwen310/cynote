'use client';

import { useTheme } from 'next-themes';
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { PartialBlock } from '@blocknote/core';

interface EditorProps {
  initialContent: PartialBlock[];
  editable?: boolean;
  onChange: (value: PartialBlock[]) => void;
}

export default function Editor({
  initialContent,
  editable,
  onChange,
}: EditorProps) {
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (initialContent as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      editable={editable}
      onChange={() => onChange(editor.document)}
    />
  );
}
