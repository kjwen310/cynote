import { create } from 'zustand';
import { TaskCard } from '@prisma/client';
import { WorkspaceWithDetail } from '@/types';

export type ModalType =
  | 'signOut'
  | 'confirm'
  | 'workspaceCreate'
  | 'workspaceCollaborator'
  | 'workspaceInvite'
  | 'workspaceSetting'
  | 'taskBoardCreate'
  | 'taskCard'
  | 'noteCreate';

type ConfirmData = {
  title: string;
  description?: string;
}

interface ModalData {
  workspace?: WorkspaceWithDetail;
  taskCard?: TaskCard;
  confirm?: ConfirmData;
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
