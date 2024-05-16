"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TaskBoard } from '@prisma/client';

interface BoardTitleFormProps {
  board: TaskBoard;
}

export const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return 
  }

  return (
    <Button onClick={enableEditing} className="w-auto h-auto font-bold text-lg p-1 px-2">
      {board.title}
    </Button>
  );
};
