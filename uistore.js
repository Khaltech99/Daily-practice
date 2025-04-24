import { create } from "zustand";
export const uiStore = create((set) => ({
  toggleMode: "light",
  changeToggleMode: () =>
    set((state) => ({
      toggleMode: state.toggleMode === "light" ? "dark" : "light",
    })),
}));
