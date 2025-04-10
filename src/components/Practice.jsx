import { Minus, Plus, Trash2, UtensilsCrossed, Asterisk } from "lucide-react";
import React from "react";
import { counterStore } from "../../testStore";

const Practice = () => {
  const count = counterStore((state) => state.count);
  const increment = counterStore((state) => state.increment);
  const decrement = counterStore((state) => state.decrement);
  const reset = counterStore((state) => state.reset);
  const cut = counterStore((state) => state.cut);
  const double = counterStore((state) => state.double);

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
        <UtensilsCrossed
          className="bg-amber-500 p-1 rounded-sm text-white"
          onClick={cut}
        />
        <Asterisk
          className="bg-amber-500 p-1 rounded-sm text-white"
          onClick={double}
        />
      </div>
    </div>
  );
};

export default Practice;
