import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterPage from '../pages/FilterPage/FilterPage';
import MenuPage from '../pages/MenuPage/MenuPage';
import HomePage from '../pages/HomePage/HomePage';

const MVPRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="filter" element={<FilterPage />} />
            <Route path="menu" element={<MenuPage />} />
          <Route path="/" element={<HomePage />}>
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default MVPRouter;