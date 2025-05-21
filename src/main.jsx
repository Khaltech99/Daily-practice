import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import AddProduct from "./AddProduct";
// import ShadPractice from "./components/ShadPractice.jsx";
import Wrapper from "./components/Wrapper";
import ProductPage from "./ProductPage";
// import Login from "./components/Login";
// import HomePage from "./components/HomePage";
// import PasswordReset from "./components/PasswordReset";
// import UpdatePassword from "./components/updatePassword";
// import Verified from "./components/Verified";
// import Random from "./components/Random";
// import SignUp from "./components/SignUp";
// import Success from "./components/Success";
// import Fail from "./components/Fail";
// import PhoneLogin from "./components/PhoneLogin";
// import VerifyOtp from "./components/VerifyOtp";
// import { Toaster } from "sonner"; // ✅ Correct import

const todoClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={todoClient}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Random />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/verify" element={<Verified />} />
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Fail />} />
          <Route path="/phone-login" element={<PhoneLogin />} />
          <Route path="/verify-otp" element={<VerifyOtp />} /> */}
          <Route path="/" element={<AddProduct />} />
          <Route path="/productpage" element={<ProductPage />} />
        </Routes>
        <Wrapper />
        {/* ✅ Correct placement */}
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
