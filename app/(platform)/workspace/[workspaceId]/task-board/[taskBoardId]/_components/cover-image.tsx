'use client';

import { ImageIcon } from 'lucide-react';
import { TaskBoard } from '@prisma/client';

import { useModal } from '@/hooks/use-modal';
import { CoverImageContainer } from '@/components/shared-ui/cover-image-container';

interface CoverImageProps {
  taskBoard: TaskBoard;
}

export const CoverImage = ({ taskBoard }: CoverImageProps) => {
  const { onOpen } = useModal();

  return (
    <CoverImageContainer
      imageUrl={taskBoard.imageLgUrl}
      showBtn={true}
      btnText="Change Cover"
      btnIcon={<ImageIcon className="w-4 h-4 mr-2" />}
      onClick={() => onOpen('taskBoardUpdateCover', { taskBoard })}
    />
  );
};
