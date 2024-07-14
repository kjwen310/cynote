'use client';

import { useState, useEffect } from 'react';

import { UserModal } from '@/components/modals/user-modal';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { WorkspaceCreateModal } from '@/components/modals/workspace-create-modal';
import { WorkspaceCollaboratorModal } from '@/components/modals/workspace-collaborator-modal';
import { WorkspaceInviteModal } from '@/components/modals/workspace-invite-modal';
import { WorkspaceSettingModal } from '@/components/modals/workspace-setting-modal';
import { TaskBoardCreateModal } from '@/components/modals/task-board-create-modal';
import { TaskCardModal } from '@/components/modals/task-card-modal';
import { NoteCreateModal } from '@/components/modals/note-create-modal';
import { NoteUpdateCoverModal } from '@/components/modals/note-update-cover-modal';
import { TaskBoardUpdateCoverModal } from '@/components/modals/task-board-update-cover-modal';
import { SubscriptionModal } from '@/components/modals/subscription-modal';

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
      <UserModal />
      <ConfirmModal />
      <WorkspaceCreateModal />
      <WorkspaceCollaboratorModal />
      <WorkspaceInviteModal />
      <WorkspaceSettingModal />
      <TaskBoardCreateModal />
      <TaskCardModal />
      <NoteCreateModal />
      <NoteUpdateCoverModal />
      <TaskBoardUpdateCoverModal />
      <SubscriptionModal />
    </>
  );
};
