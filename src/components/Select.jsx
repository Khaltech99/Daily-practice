import React, { useState } from "react";
import Typo from "./Typo";
import Wrapper from "../Wrapper";
import { ArrowBigUp, Minus } from "lucide-react";

const Select = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("all");

  const showCurrentStatus = true; //showing current status

  const handleStatus = (status) => {
    //handling status on click
    setStatus(status);
    setIsOpen(false);
  };

  return (
    <div>
      <Wrapper styles="flex w-full justify-between bg-blue-400 mt-3 rounded p-2 h-10 items-center text-white">
        {showCurrentStatus && (
          <Typo styles="text-base capitalize font-semibold">{status}</Typo>
        )}
        <div className="flex justify-end items-end">
          <Minus className="rotate-90 h-auto" />
          <ArrowBigUp onClick={() => setIsOpen(!isOpen)} />
        </div>
      </Wrapper>
      {isOpen && (
        <Wrapper styles="flex flex-col border border-blue-400 rounded-sm shadow-lg ">
          {["all", "complete", "incomplete"].map((status) => (
            <Typo
              styles="bg-blue-200 p-2 mt-1 mb-2 capitalize"
              onClick={() => handleStatus(status)}
            >
              {status}
            </Typo>
          ))}
        </Wrapper>
      )}
    </div>
  );
};

export default Select;
