import React from "react";
import styles from "./HomePage.module.scss";
import Header from "@src/components/Header/Header";
import InputSearch from "@src/components/InputSearch/InputSearch";
import RestoCard from "@src/components/RestoCard/RestoCard";
import MapButton from "@src/components/MapButton/MapButton";
import Filter from "@src/components/Filter/Filter";
import {handleFilterRequest, IRestaurantFrontEnd, ICommunicationObject} from "@src/filter/filter";
import FilterQuery from "@src/filter/filter";
import dummyDataRestaurants from '../../filter/restaurants.json';
import {useSetState} from "react-use";
import { get } from "https";

const HomePage = () => {
  // needs to be changed for the database && be sorted out as an own component
  const [inputFields, setInputFields] = React.useState(['', '']);
  const [filterButtons, setFilterButtons] = React.useState([
    { name: "oneStar", value: true },
    { name: "twoStar", value: true },
    { name: "threeStar", value: true },
    { name: "fourStar", value: true },
    { name: "fiveStar", value: true },
    { name: "Burger", value: true },
    { name: "Pizza", value: true },
    { name: "Salade", value: true },
    { name: "Sushi", value: true },
    { name: "Pasta", value: true }
  ]);
  const [rangeValue, setRangeValue] = React.useState(100);
  const [filteredRestaurants, setFilteredRestaurants] = React.useState<IRestaurantFrontEnd[]>(handleFilterRequest({name: ''}));
  const [allegens, setAllergens] = React.useState([
    { name: "milk", value: false },
    { name: "peanut", value: false },
    { name: "shellfish", value: false },
    { name: "eggs", value: false }
  ]);

  function handleFilterChange(obj: ICommunicationObject, check?: any) {
    let location = inputFields[1];
    let nameSearch = inputFields[0];
    let rangeSearch = rangeValue;
    let buttons = filterButtons;
    let allegen = allegens;

    if (obj.location) {
      location = obj.location;
      nameSearch = obj.name;
      setInputFields([obj.name, obj.location]);
    }
    if (obj.range) {
      rangeSearch = obj.range;
      setRangeValue(obj.range);
    }
    if (obj.rating) {
      setFilterButtons(check);
      buttons = check;
    }
    if (obj.allergenList) {
      setAllergens(check);
      console.log(allegens);
      allegen = check;
    }
    console.log(obj);

    let min = 0;
    let max = 0;
    let categoriesSelected = [];
    let allergenListChanged = [];

    for (let i = 0; i < 5; i++) {
      if (buttons[i].value == true) {
        if (min == 0 && max == 0) {
          min = i + 1;
          max = i + 1;
        } else if (max < i + 1) {
          max = i + 1;
        }
      }
    }
    for (let i = 5; i < buttons.length; i++) {
      if (buttons[i].value == true) {
        categoriesSelected.push(filterButtons[i].name);
      }
    }
    for (let i = 0; i < allegen.length; i++) {
      if (allegen[i].value) {
        allergenListChanged.push(allegen[i].name);
      }
    }

    const inter: ICommunicationObject = {
      range: rangeSearch,
      rating: [min, max],
      name: nameSearch,
      location: location,
      categories: categoriesSelected,
      allergenList: allergenListChanged
    }
    setFilteredRestaurants(handleFilterRequest(inter));
  }

  return (
    <div>
      <Header />
      <div className={styles.RectOnImg}>
        <span className={styles.TitleSearch}>What are you looking for ?</span>
        <InputSearch onChange={handleFilterChange} />
      </div>
      <div className={styles.DivContent}>
        <div className={styles.DivMapBtn}>
          <MapButton />
          <Filter onChange={handleFilterChange} onRangeChange={handleFilterChange}/>
        </div>
        <div>
          <h1 className={styles.TitleCard}>Berlin - +12548 Restaurants</h1>
          {filteredRestaurants.map((item, index) => {
            return <RestoCard data={item} />
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
