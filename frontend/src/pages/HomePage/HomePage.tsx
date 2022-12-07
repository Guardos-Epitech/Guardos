import React from "react";
import { NavigateTo } from "../../utils/NavigateTo";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import Header from "@src/components/Header/Header";
import foodbg from "@src/asset/foodbg.png";
import InputSearch from "@src/components/InputSearch/InputSearch";
import RestoCard from "@src/components/RestoCard/RestoCard";

const HomePage = () => {
  // let navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className={styles.RectOnImg}>
        <span className={styles.TitleSearch}>What are you looking for ?</span>
        <InputSearch />
      </div>
      <div className={styles.DivContent}>
        <h1 className={styles.TitleCard}>Berlin - +12548 Restaurants</h1>
        <RestoCard />
      </div>
      {/* filter view */}
    </div>
  );
};

export default HomePage;
