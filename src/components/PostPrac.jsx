import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTodo } from "../../store";

const PostPrac = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { data, isError } = useQuery({
    queryKey: ["todo"],
    queryFn: useTodo,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoData = {
      userId: userId,
      title: title,
      body: body,
    };
  };

  isError && console.log("error", isError);
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
        <input
          type="text"
          className=" bg-none border-2 outline-0 p-2 border-blue-400 rounded w-[80%] my-2"
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default PostPrac;
