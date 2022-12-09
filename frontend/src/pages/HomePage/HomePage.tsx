import React from "react";
import styles from "./HomePage.module.scss";
import Header from "@src/components/Header/Header";
import InputSearch from "@src/components/InputSearch/InputSearch";
import RestoCard from "@src/components/RestoCard/RestoCard";
import MapButton from "@src/components/MapButton/MapButton";
import Filter from "@src/components/Filter/Filter";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className={styles.RectOnImg}>
        <span className={styles.TitleSearch}>What are you looking for ?</span>
        <InputSearch />
      </div>
      <div className={styles.DivContent}>
        <div className={styles.DivMapBtn}>
          <MapButton />
          <Filter />
        </div>
        <div>
          <h1 className={styles.TitleCard}>Berlin - +12548 Restaurants</h1>
          <RestoCard />
          <RestoCard />
          <RestoCard />
          <RestoCard />
          <RestoCard />
          <RestoCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
