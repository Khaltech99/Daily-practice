import { Check, Pen, Plus, ThumbsUp, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { todoStore } from "../../todoStore";

const Todo = () => {
  const { todos, deleteTodo, addTodo } = todoStore();
  const [userInput, setUserInput] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;
    addTodo(userInput);
    setUserInput("");
  };
  const [isEditing, setIsEditing] = useState(false); //this dispalys the editig
  const [editedText, setEditedText] = useState(""); //this set the edited text
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <div className="flex gap-2 justify-center items-center" key={index}>
          <div>
            <div className="flex gap-2 items-center">
              <div className="bg-amber-500 p-1 rounded-sm text-white  flex justify-center items-center w-6 h-6">
                <Check />
              </div>
              <h1 className="text-lg">{todo.userInput}</h1>
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <Trash2
              className="bg-amber-500 p-1 rounded-sm text-white"
              onClick={() => deleteTodo(todo.id)}
            />
            <Pen
              className="bg-amber-500 p-1 rounded-sm text-white"
              onClick={handleEdit}
            />
          </div>
          {isEditing && (
            <div className="flex flex-col justify-center items-center mt-6 gap-2">
              <input
                type="text"
                className="bg-none bg-blue-200 h-8 p-3 rounded-sm outline-none text-[red]"
                onChange={(e) => setEditedText(e.target.value)}
              />
              <ThumbsUp
                color="white"
                className="bg-green-700 w-20 rounded-md p-1"
              />
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-col justify-center items-center mt-6 gap-2">
        <input
          type="text"
          className="bg-none bg-blue-200 h-8 p-3 rounded-sm outline-none text-[red]"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Plus
          color="white"
          className="bg-green-700 w-20 rounded-md p-1"
          onClick={handleAddTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
