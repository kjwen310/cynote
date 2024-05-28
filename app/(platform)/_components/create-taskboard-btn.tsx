'use client';

import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';

export const CreateTaskBoardBtn = () => {
  const { onOpen } = useModal();

  return (
    <Button variant="ghost" onClick={() => onOpen('taskBoardCreate')}>
      Create Board
    </Button>
  );
};
