import React from "react";
// import Search from "./components/Search";
// import Home from "./components/Home";
// import Practice from "./components/Practice";
// import DashBoard from "./components/DashBoard";
// import Todo from "./components/Todo";
// import Movies from "./components/Movies";
// import PostPrac from "./components/PostPrac";
// import QueryPractice from "./components/QueryPractice";
// import DisplayPosts from "./components/displayPosts";
import Weather from "./components/Weather";
import { uiStore } from "../uistore";
// import { Outlet } from "react-router";

const App = () => {
  const toggleMode = uiStore((state) => state.toggleMode);

  return (
    <div
      className={` ${
        toggleMode !== "light" ? "bg-neutral-900" : "bg-neutral-700"
      }  h-screen pt-[7rem]`}
    >
      <Weather />
    </div>
  );
};

export default App;
