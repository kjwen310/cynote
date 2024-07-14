'use client';

import { SectionItemType } from '@/types';
import { ModalType, useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';

interface CreateBtnProps {
  type: SectionItemType;
  isReachLimit: boolean;
}

const typeMap = {
  taskBoard: {
    text: 'Task Board',
    modal: 'taskBoardCreate',
  },
  note: {
    text: 'Note',
    modal: 'noteCreate',
  },
};

export const CreateBtn = ({ type, isReachLimit }: CreateBtnProps) => {
  const { onOpen } = useModal();

  const onClick = () => {
    if (isReachLimit) {
      onOpen('subscription');
    } else {
      onOpen(typeMap[type].modal as ModalType);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-1 relative w-full h-full bg-muted rounded-sm aspect-video transition cursor-pointer hover:opacity-75">
      <Button variant="ghost" onClick={onClick} className="w-full h-full">
        {`Create ${typeMap[type].text}`}
      </Button>
    </div>
  );
};
