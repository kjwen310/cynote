'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Note } from '@prisma/client';
import { useModal } from '@/hooks/use-modal';

import { Button } from '@/components/ui/button';

interface CoverImageProps {
  note: Note;
  isAuthor: boolean;
}

export const CoverImage = ({ note, isAuthor }: CoverImageProps) => {
  const { onOpen } = useModal();
  return (
    <div
      className={cn(
        'relative w-full h-[36vh] group',
        note.imageLgUrl ? 'bg-muted' : 'h-[12vh]'
      )}
    >
      {!!note.imageLgUrl && (
        <Image
          fill
          src={note.imageLgUrl}
          sizes="(max-width: 768px) 100vw"
          alt="note cover image"
          className="object-cover"
        />
      )}
      {isAuthor && (
        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpen('noteUpdateCover', { note })}
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change Cover
          </Button>
        </div>
      )}
    </div>
  );
};
