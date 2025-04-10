import { create } from "zustand";
export const counterStore = create((set) => ({
  count: 0,
  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),
  decrement: () =>
    set((state) => ({
      count: state.count < 0 || state.count === 0 ? 0 : state.count - 1,
    })),
  reset: () => set({ count: 0 }),
  double: () =>
    set((state) => ({
      count: state.count * 2,
    })),
  cut: () =>
    set((state) => ({
      count: state.count === 0 ? 0 : state.count / 2,
    })),
}));
