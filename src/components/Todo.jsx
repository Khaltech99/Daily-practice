import { Check, Edit, Pen, Plus, ThumbsUp, Trash, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { todoStore } from "../../todoStore";

const Todo = () => {
  const {
    deleteTodo,
    addTodo,
    editTodo,
    setFilter,
    filteredTodos,
    toggleTodo,
  } = todoStore();
  const [userInput, setUserInput] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;
    addTodo(userInput);
    setUserInput("");
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editId, setEditId] = useState(null);

  // ✅ Handles opening the edit form
  const startEditing = (e, id, currentText) => {
    e.preventDefault();
    setIsEditing(true);
    setEditId(id);
    setEditedText(currentText); // populate input with current text
  };

  // ✅ Handles saving the edited todo
  const handleSaveEdit = () => {
    if (editedText.trim() === "") return;
    editTodo(editId, editedText);
    setIsEditing(false);
    setEditId(null);
    setEditedText("");
  };

  // ✅ Handles canceling the edit
  const cancelEdit = () => {
    setEditId(null);
    setIsEditing(false);
    setEditedText("");
  };

  //handles setting the filter

  //changes the status of the filter
  const changeFilterType = (e, status) => {
    e.preventDefault();
    setFilter(status);
  };

  return (
    <div>
      {filteredTodos().map((todo) => (
        <div className="flex gap-2 justify-center items-center" key={todo.id}>
          <div>
            <div className="flex gap-2 items-center">
              <div
                className="bg-amber-500 p-1 rounded-sm text-white flex justify-center items-center w-6 h-6"
                onClick={() => toggleTodo(todo.id)}
              >
                <Check
                  className={`${todo.completed ? "opacity" : "opacity-0"}`}
                />
              </div>
              {/* ✅ Changed todo.userInput to todo.text, adjust based on your store */}
              <h1 className="text-lg">{todo.userInput}</h1>
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <Trash2
              className="bg-amber-500 p-1 rounded-sm text-white"
              onClick={() => deleteTodo(todo.id)}
            />
            {/* ✅ Properly passing parameters to startEditing */}
            <Pen
              className="bg-amber-500 p-1 rounded-sm text-white"
              onClick={(e) => startEditing(e, todo.id, todo.userInput)}
            />
          </div>

          {/* ✅ Show edit input only for the specific todo being edited */}
          {isEditing && editId === todo.id && (
            <div className="flex flex-col justify-center items-center mt-6 gap-2">
              <input
                type="text"
                value={editedText}
                className="bg-blue-200 h-8 p-3 rounded-sm outline-none text-[red]"
                onChange={(e) => setEditedText(e.target.value)}
              />
              <div className="flex gap-1">
                <ThumbsUp
                  color="white"
                  className="bg-green-700 w-20 rounded-md p-1"
                  onClick={handleSaveEdit} // ✅ Corrected: directly call save
                />
                <Trash
                  color="white"
                  className="bg-green-700 w-20 rounded-md p-1"
                  onClick={cancelEdit} // ✅ Corrected: directly call cancel
                />
              </div>
              <div className="flex gap-2 bg-red-200 "></div>
            </div>
          )}
        </div>
      ))}

      {/* Add Todo Input */}
      <div className="flex flex-col justify-center items-center mt-6 gap-2">
        <input
          type="text"
          value={userInput}
          className="bg-blue-200 h-8 p-3 rounded-sm outline-none text-[red]"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Plus
          color="white"
          className="bg-green-700 w-20 rounded-md p-1"
          onClick={handleAddTodo}
        />
      </div>
      <div className="flex gap-2  justify-center items-center mt-4">
        {["all", "active", "completed"].map((status) => (
          <p
            className="p-2 bg-red-300 rounded-lg cursor-pointer"
            onClick={(e) => changeFilterType(e, status)}
          >
            {status}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Todo;
