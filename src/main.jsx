import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import ShadPractice from "./components/ShadPractice.jsx";
import Wrapper from "./components/Wrapper";
// import { Toaster } from "sonner"; // ✅ Correct import

const todoClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={todoClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShadPractice />} />
        </Routes>
        <Wrapper />
        {/* ✅ Correct placement */}
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
