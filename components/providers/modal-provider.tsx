'use client';

import { CardModal } from '../../app/(platform)/workspace/[workspaceId]/task-board/[taskBoardId]/_components/card-modal';
import { useIsMounted } from 'usehooks-ts';

export const ModalProvider = () => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <CardModal />;
};
