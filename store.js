import { useQuery } from "@tanstack/react-query";

const fetchTodo = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const data = response.json();
  return data;
};

export const useTodos = () => {
  return useQuery({
    queryKey: ["todo"],
    queryFn: fetchTodo,
  });
};
