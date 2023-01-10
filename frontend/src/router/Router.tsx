import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterPage from "@src/pages/FilterPage";
import MenuPage from "@src/pages/MenuPage";
import HomePage from "@src/pages/HomePage";
import ScrollToTop from "@src/components/ScrollToTop/ScrollToTop";
import AppOutlet from "@src/pages/AppOutlet/AppOutlet";

const MVPRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppOutlet />}>
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/" element={<HomePage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MVPRouter;
