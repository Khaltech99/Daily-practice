import axios from "axios";
import { create } from "zustand";

export async function paginate(page) {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    return data;
  } catch (error) {
    throw new Error(`error fetching data: ${error}`);
  }
}

export const todoStore = create((set) => ({
  page: 1,
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  decrementPage: () => set((state) => ({ page: Math.max(state.page - 1, 1) })),
}));
