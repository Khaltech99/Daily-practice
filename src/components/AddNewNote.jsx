import Wrapper from "../Wrapper";
import Typo from "./Typo";
import Button from "./Button";
import { useState } from "react";
import { useTodoStore } from "../../useTodoStore";

const AddNewNote = ({ openModal, handleModal }) => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ fix
    if (userInput.trim() === "") return;
    addTodo(userInput); // ✅ add to store
    setUserInput(""); // clear input
    handleModal(); // close modal
  };

  return (
    <div className="w-[100%] md:w-[500px] md:m-auto">
      {openModal && (
        <Wrapper styles="bg-blue-100 shadow-xl h-[300px] mt-4 flex flex-col justify-between p-6 w-full rounded-lg">
          <div className="flex flex-col gap-6 justify-center">
            <Typo styles="text-xl text-gray-400 text-center uppercase font-bold">
              new note
            </Typo>
            <div className="border border-blue-400 rounded-sm h-10 flex justify-between items-center gap-4 p-4">
              <input
                type="text"
                className="w-full outline-none bg-none placeholder-gray-400 text-base"
                placeholder="New note"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-8 justify-between mt-4">
            {["cancel", "submit"].map((btn) => {
              const isSubmit = btn === "submit";
              const buttonClasses = isSubmit
                ? "text-blue-500 text-xl py-2 px-4 rounded-sm border border-blue-300"
                : "text-white bg-blue-500 py-2 px-4 rounded-sm ";

              return (
                <Button
                  key={btn}
                  className={buttonClasses}
                  onClick={btn === "cancel" ? handleModal : handleSubmit}
                >
                  {btn}
                </Button>
              );
            })}
          </div>
        </Wrapper>
      )}
    </div>
  );
};

export default AddNewNote;
