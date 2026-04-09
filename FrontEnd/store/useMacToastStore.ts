import { create } from "zustand";

type MacToastState = {
  visible: boolean;
  title: string;
  subtitle?: string;
  show: (title: string, subtitle?: string) => void;
  hide: () => void;
};

let hideTimer: ReturnType<typeof setTimeout> | null = null;

export const useMacToastStore = create<MacToastState>((set) => ({
  visible: false,
  title: "",
  subtitle: undefined,
  show: (title, subtitle) => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    set({ visible: true, title, subtitle });
    hideTimer = setTimeout(() => {
      set({ visible: false });
      hideTimer = null;
    }, 4500);
  },
  hide: () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    set({ visible: false });
  },
}));

export function showMacToast(title: string, subtitle?: string) {
  useMacToastStore.getState().show(title, subtitle);
}
