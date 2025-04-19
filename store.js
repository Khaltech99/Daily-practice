import axios from "axios";

export const postTodo = async (input) => {
  try {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",

      input
    );

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
