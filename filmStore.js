import { create } from "zustand";

export const filmStore = create((set) => ({
  movies: [],
}));
