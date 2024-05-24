import { create } from 'zustand';

interface MemberModalStore {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
}

export const useMemberModal = create<MemberModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));