'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Block } from '@blocknote/core';

const Editor = dynamic(() => import('@/components/editor/editor'), {
  ssr: false,
});

const initialContent = [
  {
    type: 'paragraph',
    content: 'Welcome to this demo!',
  },
  {
    type: 'heading',
    content: 'This is a heading block',
  },
  {
    type: 'paragraph',
    content: 'This is a paragraph block',
  },
  {
    type: 'paragraph',
  },
];

export const NoteEditor = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  return (
    <div>
      <Editor
        initialContent={JSON.stringify(initialContent)}
        onChange={setBlocks}
      />
      <div>Document JSON:</div>
      <div className={'item bordered'}>
        <pre>
          <code>{JSON.stringify(blocks, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};