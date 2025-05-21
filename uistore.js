import { create } from "zustand";
export const uiStore = create((set) => ({
  toggleMode: "light",
  changeToggleMode: () =>
    set((state) => ({
      toggleMode: state.toggleMode === "light" ? "dark" : "light",
    })),
}));

export const authStore = create((set) => ({
  user: null,
  isVerified: false,
  setIsVerified: (isVerified) => set({ isVerified: isVerified }),
  email: "",
  sessionId: "",
  userFn: (username) => set({ user: username }),
  emailFn: (email) => set({ email: email }),
  sessionIdFn: (sessionId) => set({ sessionId: sessionId }),
  resetFn: () => set({ user: null, email: "" }),
}));

export const productStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products: products }),
}));
