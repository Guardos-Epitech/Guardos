import React, { useEffect } from 'react';
import styles from "@src/pages/MapPage/MapPage.module.scss";
import Header from "@src/components/Header/Header";
import InputSearch from "@src/components/InputSearch/InputSearch";
import BackButton from '@src/components/HomeButton/HomeButton';
import Filter from "@src/components/Filter/Filter";
import MapView from '@src/components/Map/Map';
import { IRestaurantFrontEnd, IFilterObject } from "@src/filter/filter";
import { getSelectedFilteredRestos } from "@src/services/filterCalls";

const MapPage = () => {
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
    { name: "Salad", value: true },
    { name: "Sushi", value: true },
    { name: "Pasta", value: true }
  ]);
  const [rangeValue, setRangeValue] = React.useState(100);
  const [filteredRestaurants, setFilteredRestaurants] = React.useState<Array<IRestaurantFrontEnd>>();
  const [allergens, setAllergens] = React.useState([
    { name: "milk", value: false },
    { name: "peanut", value: false },
    { name: "shellfish", value: false },
    { name: "eggs", value: false }
  ]);

  useEffect(() => {
    updateRestoData();
  }, []);

  const updateRestoData = () => {
    const inter: IFilterObject = { name: "" }
    getSelectedFilteredRestos(inter).then((res) => {
      setFilteredRestaurants(res);
    });
  }

  async function handleFilterChange(obj: IFilterObject, check?: any) {
    // Construct the filter based on the provided object
    const filter: any = {};
    if (obj.allergenList && obj.allergenList.length > 0) {
      filter.allergenList = obj.allergenList;
    }
    if (obj.location) {
      filter.location = obj.location;
    }
    if (obj.name) {
      filter.name = obj.name;
    }
    if (obj.rating && obj.rating.length === 2) {
      filter.rating = {
        $gte: obj.rating[0],
        $lte: obj.rating[1]
      };
    }
    if (obj.range) {
      filter.range = obj.range;
    }
    if (obj.categories && obj.categories.length > 0) {
      filter.categories = {
        $in: obj.categories
      };
    }
    if (obj.dishes) {
      filter.dishes = obj.dishes;
    }

    // Call the backend API to get the filtered restaurants
    const inter = await getSelectedFilteredRestos(filter);

    // Set the filtered restaurants
    setFilteredRestaurants(inter);
  }

  return (
    <>
      <Header />
      <div className={styles.RectOnImg}>
        <span className={styles.TitleSearch}>What are you looking for ?</span>
        <InputSearch onChange={handleFilterChange} />
      </div>
      <div className={styles.DivContent}>
        <div className={styles.DivMapBtn}>
          <BackButton />
          <Filter onChange={handleFilterChange} onRangeChange={handleFilterChange} />
        </div>
        <MapView data={filteredRestaurants} />
      </div>
    </>
  );
};

export default MapPage;