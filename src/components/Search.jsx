import React from "react";
import Wrapper from "../Wrapper";
import { SearchIcon } from "lucide-react";
import Select from "./Select";

const Search = () => {
  return (
    <div className="border border-blue-400 rounded-sm h-10 flex justify-between items-center gap-4 ">
      <SearchIcon className="text-blue-400 ml-2" />
      <input
        type="text"
        className="w-full outline-none bg-none placeholder-gray-400 text-base"
        placeholder="search note"
      />
    </div>
  );
};

export default Search;
