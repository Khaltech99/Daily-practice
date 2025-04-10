import { useState } from "react";
import Wrapper from "../Wrapper";
import AddNewNote from "./AddNewNote";
import Typo from "./Typo";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { useTodoStore } from "../../useTodoStore";

const AddTodo = () => {
  const todos = useTodoStore((state) => state.todos);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Wrapper styles="p-0 mt-2 ">
      <Wrapper
        styles="bg-blue-500 h-10 flex justify-center items-center gap-2 rounded-sm cursor-pointer"
        onClick={handleModal}
      >
        <Typo styles="text-base uppercase text-white font-bold">new note</Typo>
        <Plus color="white" />
      </Wrapper>

      <Wrapper styles="flex flex-col justify-center mt-6 gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center md:justify-center md:items-center md:gap-20"
          >
            <div className="flex justify-center items-center gap-4">
              <div
                onClick={() => toggleTodo(todo.id)}
                className={`flex items-center justify-center w-5 h-5 border border-blue-700 ${
                  todo.completed ? "bg-blue-500 text-white" : "bg-white"
                } cursor-pointer`}
              >
                {todo.completed && <Check />}
              </div>

              <Typo
                styles={`text-xl font-semibold ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.todoText}
              </Typo>
            </div>

            <div className="flex gap-4">
              <Pencil size={20} className="text-gray-500" />
              <Trash2
                size={20}
                className="text-gray-500 cursor-pointer"
                onClick={() => deleteTodo(todo.id)}
              />
            </div>
          </div>
        ))}
      </Wrapper>

      <AddNewNote handleModal={handleModal} openModal={openModal} />
    </Wrapper>
  );
};

export default AddTodo;
