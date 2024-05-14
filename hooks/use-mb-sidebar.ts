import { create } from 'zustand';

interface MbSidebarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useMbSidebar = create<MbSidebarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
