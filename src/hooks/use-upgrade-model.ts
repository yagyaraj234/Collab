import { create } from "zustand";

type UpgradeModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUpgradeModal = create<UpgradeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
