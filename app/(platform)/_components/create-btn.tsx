'use client';

import { ModalType, useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';

interface CreateBtnProps {
  type: "taskBoard" | "note";
}

const typeMap = {
  taskBoard: {
    text: "Task Board",
    modal: "taskBoardCreate",
  },
  note: {
    text: "Note",
    modal: "noteCreate",
  },
}

export const CreateBtn = ({ type }: CreateBtnProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col justify-center items-center gap-y-1 relative w-full h-full bg-muted rounded-sm aspect-video transition cursor-pointer hover:opacity-75">
      <Button variant="ghost" onClick={() => onOpen(typeMap[type].modal as ModalType)} className='w-full h-full'>
        {`Create ${typeMap[type].text}`}
      </Button>
    </div>
  );
};
