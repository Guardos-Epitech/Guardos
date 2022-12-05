import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterPage from "@src/pages/FilterPage";
import MenuPage from "@src/pages/MenuPage/MenuPage";
import HomePage from "@src/pages/HomePage/HomePage";

const MVPRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="filter" element={<FilterPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MVPRouter;
