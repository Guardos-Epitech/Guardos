// import dummyDataFilter from './filterData.json';
// import dummyDataRestaurants from './restaurants.json';

export interface IFilterObject {
  allergenList?: string[];
  location?: string;
  name?: string;
  rating?: number[]; //2 float rating lowest and highest
  range?: number;
  categories?: string[];
  dishes?: any;
}

export interface ICategories {
  name: string;
  hitRate: number;
  dishes: [IDishFE];
}

interface IMealType {
  name: string;
  id: number;
  sortId: number;
}

interface ICategoryBE {
  menuGroup: string,
  foodGroup: string,
  extraGroup: string
}

interface ICategoryFE {
  foodGroup: string,
  extraGroup: string
}

interface ILocation {
  streetName: string,
  streetNumber: string,
  postalCode: string,
  country: string;
  city: string;
}

interface IDishBE {
  name: string;
  description: string;
  price: number;
  allergens: string;
  category: ICategoryBE;
}

export interface IDishFE {
  name: string;
  description: string;
  price: number;
  allergens: string;
  pictures: [string];
  category: ICategoryFE;
}

interface IFilterObj {
  savedFilter: IFilterObject;
  savedRestaurants: IRestaurantFrontEnd[][];
}

export interface IRestaurantFrontEnd {
  name: string;
  id: number;
  phoneNumber: string;
  categories: [ICategories];
  location: ILocation;
  pictures: [string];
  rating: number;
  ratingCount: number;
  range: number
  description: string;
  hitRate: number;
  dishes: any;
}

export interface IRestaurantBackEnd {
  name: string;
  id: number;
  phoneNumber: string;
  description: string;
  rating: number;
  range: number;
  dishes: [IDishBE];
  location: ILocation;
  mealType: [IMealType];
  extra: [IDishBE];
}
