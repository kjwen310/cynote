'use client';

import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';

export const CreateWorkspaceBtn = () => {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen('workspaceCreate')}>
      Create Your Workspace
    </Button>
  );
};
