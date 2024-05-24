'use client';

import { CardModal } from '../../app/(platform)/workspace/[workspaceId]/task-board/[taskBoardId]/_components/card-modal';
import { InviteModal } from '@/app/(platform)/_components/invite-modal';
import { MemberModal } from '@/app/(platform)/_components/member-modal';
import { useIsMounted } from 'usehooks-ts';

export const ModalProvider = () => {
  const isMounted = useIsMounted();

  if (!isMounted()) {
    return null;
  }

  return (
    <>
      <CardModal />;
      <InviteModal />
      <MemberModal />
    </>
)
};
