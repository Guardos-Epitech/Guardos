import React from "react";
import styles from "./HomePage.module.scss";
import Header from "@src/components/Header/Header";
import InputSearch from "@src/components/InputSearch/InputSearch";
import RestoCard from "@src/components/RestoCard/RestoCard";
import MapButton from "@src/components/MapButton/MapButton";
import Filter from "@src/components/Filter/Filter";

const HomePage = () => {
  const [inputFields, setInputFields] = React.useState(null);
  const [filterButtons, setFilterButtons] = React.useState(null);
  const [rangeValue, setRangeValue] = React.useState(null);

  function handleChangeInputFields(newValues : any) {
    setInputFields(newValues);
    console.log(inputFields);
  }

  function handleChangeFilterButtons(newValues : any) {
    setFilterButtons(newValues);
    console.log(filterButtons);
  }

  function handleChangeInRange(newRange : any) {
    setRangeValue(newRange);
    console.log(rangeValue);
  }

  return (
    <div>
      <Header />
      <div className={styles.RectOnImg}>
        <span className={styles.TitleSearch}>What are you looking for ?</span>
        <InputSearch onChange={handleChangeInputFields} />
      </div>
      <div className={styles.DivContent}>
        <div className={styles.DivMapBtn}>
          <MapButton />
          <Filter onChange={handleChangeFilterButtons} onRangeChange={handleChangeInRange}/>
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
