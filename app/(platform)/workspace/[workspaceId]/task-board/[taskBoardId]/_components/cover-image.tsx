'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskBoard } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';

interface CoverImageProps {
  taskBoard: TaskBoard;
}

export const CoverImage = ({ taskBoard }: CoverImageProps) => {
  const { onOpen } = useModal();
  return (
    <div
      className={cn(
        'relative w-full h-[36vh] group',
        taskBoard.imageLgUrl ? 'bg-muted' : 'h-[12vh]'
      )}
    >
      {!!taskBoard.imageLgUrl && (
        <Image
          fill
          src={taskBoard.imageLgUrl}
          alt="task board cover image"
          className="object-cover"
        />
      )}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpen('taskBoardUpdateCover', { taskBoard })}
          className="text-xs text-muted-foreground"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Change Cover
        </Button>
      </div>
    </div>
  );
};