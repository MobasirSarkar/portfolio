import { create } from "zustand";

type UiState = {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
  /** Destination of an in-flight manga page-turn transition, null when idle. */
  turnTo: string | null;
  startTurn: (href: string) => void;
  endTurn: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  navOpen: false,
  setNavOpen: (navOpen) => set({ navOpen }),
  turnTo: null,
  startTurn: (href) => set({ turnTo: href, navOpen: false }),
  endTurn: () => set({ turnTo: null }),
}));
