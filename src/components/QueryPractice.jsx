// import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { paginate, todoStore } from "../../store";

const QueryPractice = () => {
  const page = todoStore((state) => state.page);
  const increment = todoStore((state) => state.incrementPage);
  const decrement = todoStore((state) => state.decrementPage);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["todos", page],
    queryFn: () => paginate(page),
    keepPreviousData: true,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <h1>Loading...</h1>;
  if (isFetching) return <h1>fetching...</h1>;
  if (!data) return <h1>no data available</h1>;

  return (
    <>
      {data.map((dat) => (
        <div key={dat.id}>
          <h1 className="mb-6 text-red-500 font-bold">{dat.title}</h1>
          <p>{dat.body.split(" ").splice(0, 5).join(" ")}</p>
        </div>
      ))}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="bg-green-500 text-white rounded-sm"
          onClick={increment}
          // onScroll={increment}
        >
          Next
        </button>
        <button
          className="bg-red-500 text-white rounded-sm"
          disabled={page === 1}
          onClick={decrement}
        >
          Previous
        </button>
      </div>
    </>
  );
};

export default QueryPractice;
