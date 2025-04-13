import { create } from "zustand";
export const todoStore = create((set, get) => ({
  todos: [],
  filter: "all", //this is where the changes occurs
  setFilter: (filterType) => set({ filter: filterType }), //setting filter state i.e all, complete,incomplete

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
  filteredTodos: () => {
    const { todos, filter } = get();
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  },

  forceComplete: () =>
    set((state) => ({
      todos: state.todos.map((todo) => ({
        ...todo,
        completed: true,
      })),
    })),
  forceTrash: () =>
    set({
      todos: [],
    }),
}));
