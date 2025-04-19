import axios from "axios";

export const postTodo = async (input) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",

      input
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
