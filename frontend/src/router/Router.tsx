import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "@src/pages/MenuPage";
import HomePage from "@src/pages/HomePage";
import RegistrationPage from "@src/pages/RegistrationPage";
import LoginPage from "@src/pages/LoginPage";
import ScrollToTop from "@src/components/ScrollToTop/ScrollToTop";

const MVPRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MVPRouter;
