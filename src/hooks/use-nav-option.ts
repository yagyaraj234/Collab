import { create } from "zustand";

type NavState = {
  nav: string;
  setNavValue: (item: string) => void;
};

export const useNavOption = create<NavState>((set) => ({
  nav: "Overview",
  setNavValue: (item: string) => set({ nav: item }),
}));
