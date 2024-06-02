'use client';

import { useState, useEffect } from 'react';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { WorkspaceCreateModal } from '@/components/modals/workspace-create-modal';
import { WorkspaceCollaboratorModal } from '@/components/modals/workspace-collaborator-modal';
import { WorkspaceInviteModal } from '@/components/modals/workspace-invite-modal';
import { WorkspaceSettingModal } from '@/components/modals/workspace-setting-modal';
import { WorkspaceLeaveModal } from '@/components/modals/workspace-leave-modal';
import { WorkspaceDeleteModal } from '@/components/modals/workspace-delete-modal';
import { TaskBoardCreateModal } from '@/components/modals/task-board-create-modal';
import { TaskCardModal } from '@/components/modals/task-card-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ConfirmModal />
      <WorkspaceCreateModal />
      <WorkspaceCollaboratorModal />
      <WorkspaceInviteModal />
      <WorkspaceSettingModal />
      <WorkspaceLeaveModal />
      <WorkspaceDeleteModal />
      <TaskBoardCreateModal />
      <TaskCardModal />
    </>
  );
};
