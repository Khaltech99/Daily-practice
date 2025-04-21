import axios from "axios";

export async function fetchPosts() {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUser(id) {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users?id=${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
fetchUser(12);
