export const postTodo = async (input) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
