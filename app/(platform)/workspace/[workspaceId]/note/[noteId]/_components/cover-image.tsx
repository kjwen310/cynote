'use client';

import { ImageIcon } from 'lucide-react';
import { Note } from '@prisma/client';

import { useModal } from '@/hooks/use-modal';
import { CoverImageContainer } from '@/components/shared-ui/cover-image-container';

interface CoverImageProps {
  note: Note;
  isAuthor: boolean;
}

export const CoverImage = ({ note, isAuthor }: CoverImageProps) => {
  const { onOpen } = useModal();

  return (
    <CoverImageContainer
      imageUrl={note.imageLgUrl}
      showBtn={isAuthor}
      btnText="Change Cover"
      btnIcon={<ImageIcon className="w-4 h-4 mr-2" />}
      onClick={() => onOpen('noteUpdateCover', { note })}
    />
  );
};
