import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { fetchPosts, fetchUser } from "../../user&postStore";
import { useNavigate } from "react-router";

const DisplayUser = () => {
  const navigate = useNavigate();

  //USER
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
  });

  //POSTS
  const {
    data: posts,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: !!user, // Only fetch posts if user data is available
  });
  //CONDITIONALS
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;
  if (postLoading) return <div>Loading...</div>;
  if (postError) return <div>Error: {error.message}</div>;
  if (!posts) return <div>No POST found</div>;

  return (
    <div>
      {user.map((currentUser) => (
        <div key={currentUser.id}>
          <h1>{currentUser?.name}</h1>
          <h1>{currentUser?.username}</h1>
          <h1>{currentUser?.email}</h1>
        </div>
      ))}
      <div>
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
      </div>
    </div>
  );
};

export default DisplayUser;
