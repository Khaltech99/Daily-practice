import { Home, LogOut, Menu, Settings, Star, User } from "lucide-react";
import React from "react";

const DashBoard = () => {
  return (
    <div className="m-6 bg-blue-300 rounded-[60px] overflow-hidden flex flex-col flex-1 md:flex-row border-box md:h-[calc(100vh-3rem)]">
      <div className="bg-purple-500 flex-col gap-2 flex justify-between items-center py-10 p-5">
        <div className="flex flex-col mt-5 gap-4 h-[200px] justify-between text-white ">
          <User />
          <Home />
          <Settings />
          <Star />
          <Menu />
        </div>
        <LogOut className="rotate-180 text-white" />
      </div>
      {/* user div*/}
      <div className="bg-purple-100 w-full p-6 grid grid-cols-8 grid-rows-3 gap-4">
        <div className="bg-red-300 col-span-2">1</div>
        <div className="bg-red-300 col-span-2">2</div>
        <div className="bg-red-300 col-span-2">3</div>
        <div className="bg-red-300 col-span-2">4</div>
        <div className="bg-red-300 col-span-4">5</div>
        <div className="bg-red-300 col-span-2">6</div>
        <div className="bg-red-300 col-span-2">7</div>
        <div className="bg-red-300 col-span-3">8</div>
        <div className="bg-red-300 col-span-3 ">9</div>
        <div className="bg-red-300 col-span-2">10</div>
      </div>
    </div>
  );
};

export default DashBoard;
