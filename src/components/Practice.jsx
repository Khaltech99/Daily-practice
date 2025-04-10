import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { counterStore } from "../../testStore";

const Practice = () => {
  const count = counterStore((state) => state.count);
  const increment = counterStore((state) => state.increment);
  const decrement = counterStore((state) => state.decrement);
  const reset = counterStore((state) => state.reset);
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <h1 className="font-bold text-4xl">{count}</h1>
      <div className="flex justify-between items-center gap-10">
        <Minus
          className="bg-amber-500 p-1 rounded-sm text-white"
          onClick={decrement}
        />
        <Plus
          className="bg-amber-500 p-1 rounded-sm text-white"
          onClick={increment}
        />
        <Trash2
          className="bg-amber-500 p-1 rounded-sm text-white"
          onClick={reset}
        />
      </div>
    </div>
  );
};

export default Practice;
