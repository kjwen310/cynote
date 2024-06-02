import { create } from 'zustand';
import { TaskCard, User } from '@prisma/client';
import { WorkspaceWithDetail } from '@/types';

export type ModalType =
  | 'user'
  | 'confirm'
  | 'workspaceCreate'
  | 'workspaceCollaborator'
  | 'workspaceInvite'
  | 'workspaceSetting'
  | 'workspaceLeave'
  | 'workspaceDelete'
  | 'taskBoardCreate'
  | 'taskCard'
  | 'noteCreate';

type ConfirmData = {
  title: string;
  description?: string;
}

interface ModalData {
  workspace?: WorkspaceWithDetail;
  user?: User;
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
