import dummyDataFilter from './filterData.json';
import dummyDataRestaurants from './restaurants.json';
export default class Filter {
    filter;
    restaurants;
  constructor() {
    this.filter = dummyDataFilter;
    this.restaurants = dummyDataRestaurants;
  }
  getFilter() {
    return this.filter;
  }

  getRestaurants() {
    return this.restaurants;
  }


  printFilter() {
      console.log(this.filter);
  }

  printall() {
      console.log(this.filter);
      console.log(this.restaurants);
  }
}