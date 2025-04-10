import { create } from "zustand";
export const todoStore = create((set) => ({
  todos: [],
  addTodo: (userInput) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), userInput, completed: false }],
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
  editTodo: (id, toEdit) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, userInput: toEdit } : todo
      ),
    })),
}));
