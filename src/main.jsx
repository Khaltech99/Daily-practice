import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
// import DisplayUser from "./components/displayUser.jsx";
import Todo from "./components/Todo.jsx";
import Quiz from "./components/Quiz.jsx";

const todoClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={todoClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
