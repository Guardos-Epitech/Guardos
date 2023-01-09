import React from 'react';
import styles from "@src/pages/MapPage/MapPage.module.scss";
import Header from "@src/components/Header/Header";
import {createTheme} from "@mui/material/styles";
import { Map } from "./map";
import Filter from "@src/components/Filter/Filter";
import InputSearch from "@src/components/InputSearch/InputSearch";
import BackButton from '@src/components/HomeButton/HomeButton';
import {handleFilterRequest, IRestaurantFrontEnd, IFilterObject} from "@src/filter/filter";
import RestoCard from "@src/components/RestoCard/RestoCard";

import MapView from '@src/components/Map/Map';

const theme = createTheme({
    palette: {
        primary: {
            main: "#FAFAFA",
        },
    },
});


const MapPage = () => {
  const [inputFields, setInputFields] = React.useState(['', '']);
  const [filterButtons, setFilterButtons] = React.useState([
    { name: "oneStar", value: true },
    { name: "twoStar", value: true },
    { name: "threeStar", value: true },
    { name: "fourStar", value: true },
    { name: "fiveStar", value: true },
    { name: "Burger", value: true },
    { name: "Pizza", value: true },
    { name: "Salad", value: true },
    { name: "Sushi", value: true },
    { name: "Pasta", value: true }
  ]);
  const [rangeValue, setRangeValue] = React.useState(100);
  const [filteredRestaurants, setFilteredRestaurants] = React.useState<Array<IRestaurantFrontEnd>>(handleFilterRequest({name: ''}));
  const [allergens, setAllergens] = React.useState([
    { name: "milk", value: false },
    { name: "peanut", value: false },
    { name: "shellfish", value: false },
    { name: "eggs", value: false }
  ]);

  function handleFilterChange(obj: IFilterObject, check?: any) {
    let location = inputFields[1];
    let nameSearch = inputFields[0];
    let rangeSearch = rangeValue;
    let buttons = filterButtons;
    let allergen = allergens;

    if (obj.location || obj.name) {
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
      allergen = check;
    }

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
    for (let i = 0; i < allergen.length; i++) {
      if (allergen[i].value) {
        allergenListChanged.push(allergen[i].name);
      }
    }

    const inter: IFilterObject = {
      range: rangeSearch,
      rating: [min, max],
      name: nameSearch,
      location: location,
      categories: categoriesSelected,
      allergenList: allergenListChanged
    }
    setFilteredRestaurants(handleFilterRequest(inter));
  }
  function renderMenu(id: number) {
    for (let i = 0; i < filteredRestaurants.length; i++) {
      if (id == i) {
        return filteredRestaurants[i];
      }
    }
  }
    return (
        <>
          <Header/>
          <div className={styles.RectOnImg}>
            <span className={styles.TitleSearch}>What are you looking for ?</span>
            <InputSearch />
          </div>     
          <div className={styles.DivContent}>
            <div className={styles.DivMapBtn}>
              <BackButton />
              <Filter onChange={handleFilterChange} onRangeChange={handleFilterChange}/>
            </div>
            {/* <Map/>    */}
            <MapView data={filteredRestaurants} />
          </div>  
       </>
    );
};

export default MapPage;