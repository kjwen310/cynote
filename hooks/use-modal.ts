import { TaskCard, Workspace } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | 'signOut'
  | 'confirm'
  | 'workspaceCreate'
  | 'workspaceMember'
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
  workspace?: Workspace;
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
