import { Home, LogOut, Menu, Settings, Star, User } from "lucide-react";
import React from "react";

const DashBoard = () => {
  return (
    <div className="m-20 bg-blue-300 rounded-[60px] overflow-hidden flex flex-col flex-1 md:flex-row border-box md:h-[calc(100vh-10rem)]">
      <div className="bg-purple-500 flex-col gap-4 flex justify-between items-center py-10 p-5">
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
      <div className="bg-purple-100 w-full p-7 grid grid-cols-[repeat(11, minmax(0,))]  gap-4 grid-rows-3">
        <div className="bg-red-300 flex justify-center items-center">1</div>
        <div className="bg-red-300">2</div>
        <div className="bg-red-300">3</div>
        <div className="bg-red-300">4</div>
        <div className="bg-red-300">5</div>
        <div className="bg-red-300  ">6</div>
        <div className="bg-red-300">7</div>
        <div className="bg-red-300">8</div>
        <div className="bg-red-300 ">9</div>
        <div className="bg-red-300">10</div>
        <div className="bg-red-300">11</div>
      </div>
    </div>
  );
};

export default DashBoard;
