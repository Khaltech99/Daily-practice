import React from "react";
import Wrapper from "../Wrapper";
import Search from "./Search";
import Select from "./Select";
import AddTodo from "./AddTodo";

const Home = () => {
  return (
    <Wrapper styles="p-6 flex ">
      <Search />
      <Select />
      <AddTodo />
    </Wrapper>
  );
};

export default Home;
