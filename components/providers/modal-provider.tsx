'use client';

import { useIsMounted } from 'usehooks-ts';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { WorkspaceCreateModal } from '@/components/modals/workspace-create-modal';
import { WorkspaceMemberModal } from '@/components/modals/workspace-member-modal';
import { WorkspaceInviteModal } from '@/components/modals/workspace-invite-modal';
import { WorkspaceSettingModal } from '@/components/modals/workspace-setting-modal';
import { TaskBoardCreateModal } from '@/components/modals/task-board-create-modal';
import { TaskCardModal } from '@/components/modals/task-card-modal';

export const ModalProvider = () => {
  const isMounted = useIsMounted();

  if (!isMounted()) {
    return null;
  }

  return (
    <>
      <ConfirmModal />
      <WorkspaceCreateModal />
      <WorkspaceMemberModal />
      <WorkspaceInviteModal />
      <WorkspaceSettingModal />
      <TaskBoardCreateModal />
      <TaskCardModal />
    </>
  );
};
