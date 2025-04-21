import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPosts } from "../../user&postStore";
import { useNavigate } from "react-router";

const DisplayPosts = () => {
  //QUERY
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  //   const qeryClient=useQueryClient()

  //NAVIGATION
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {posts.map((post) => (
        <div
          className="flex flex-col gap-2 justify-center items-center"
          onClick={() => navigate(`/users/${post.id}`)}
          key={post.id}
        >
          <button className=" text-center cursor-pointer text-green-400">
            {post.title}
          </button>
          <p className="text-base">
            {post.body.split(" ").slice(0, 10).join("")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DisplayPosts;
