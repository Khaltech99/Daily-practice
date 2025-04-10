//readme

import { create } from "zustand";
export const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (todoText) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), todoText, completed: false }],
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  editTodo: () =>
    set((state) => ({
      todos: state.todos.map(),
    })),
}));
