'use client';

import { useState, useRef, ElementRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

interface NoteHeaderProps {
  title: string;
}

export const NoteHeader = ({ title }: NoteHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };
  return (
    <Textarea
      ref={textareaRef}
      name="title"
      value={title}
      onChange={() => {}}
      className="resize-none text-5xl text-[#3F3F3F] bg-transparent font-bold break-words outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-none dark:text-[#CFCFCF]"
    />
  );
};

NoteHeader.Skeleton = function NoteHeaderSkeleton() {
  return <Skeleton className="w-24 h-6 bg-neutral-200" />;
};
