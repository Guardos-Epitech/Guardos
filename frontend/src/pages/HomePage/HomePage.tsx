import React from "react";
import Button from "@mui/material/Button";
import { NavigateTo } from "../../utils/NavigateTo";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import Header from "@src/components/Header/Header";
import foodbg from "@src/asset/foodbg.png";
import InputSearch from "@src/components/InputSearch/InputSearch";

const HomePage = () => {
  // let navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className={styles.RectOnImg}>
        <span className={styles.TitleSearch}>What are you looking for ?</span>
        <InputSearch />
      </div>
      <span>Berlin - +12548 Restaurants</span>
    </div>
  );
};

export default HomePage;
