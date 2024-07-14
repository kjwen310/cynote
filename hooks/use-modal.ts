import { create } from 'zustand';
import { Collaborator, Note, TaskBoard, TaskCard, User } from '@prisma/client';

import { WorkspaceWithDetail } from '@/types';

export type ModalType =
  | 'user'
  | 'confirm'
  | 'workspaceCreate'
  | 'workspaceCollaborator'
  | 'workspaceInvite'
  | 'workspaceSetting'
  | 'taskBoardCreate'
  | 'taskBoardUpdateCover'
  | 'taskCard'
  | 'noteCreate'
  | 'noteUpdateCover'
  | 'subscription';

type ConfirmData = {
  title: string;
  description?: string;
  onConfirm: () => void;
  isLoading: boolean;
};

interface ModalData {
  workspace?: WorkspaceWithDetail;
  user?: User;
  taskBoard?: TaskBoard;
  taskCard?: TaskCard;
  note?: Note;
  confirm?: ConfirmData;
  currentCollaboratorId?: string;
  isOwner?: boolean;
  collaborators?: Collaborator[];
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
