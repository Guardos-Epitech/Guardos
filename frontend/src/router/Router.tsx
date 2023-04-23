import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "@src/pages/MenuPage";
import HomePage from "@src/pages/HomePage";
import MapPage from "@src/pages/MapPage";
import ScrollToTop from "@src/components/ScrollToTop/ScrollToTop";

const MVPRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MVPRouter;
