import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { postTodo } from "../../store";

const PostPrac = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["todo"],
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todo"]);
    },
  });

  const userId = Date.now();
  const handleSubmit = (e) => {
    e.preventDefault();
    const todoData = {
      userId: userId,
      title: title,
      body: body,
    };
    mutate(todoData);
  };

  return (
    <div>
      <form
        action=""
        className="w-[900px] m-auto rounded-lg flex flex-col justify-center items-center "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className=" bg-none border-2 outline-0 p-2 border-blue-400 rounded w-[80%] my-2"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <input
          type="text"
          className=" bg-none border-2 outline-0 p-2 border-blue-400 rounded w-[80%] my-2"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default PostPrac;
