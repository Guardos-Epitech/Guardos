import { ILocation } from './locationInterfaces';
import { IDishBE } from './dishInterfaces';
import { IMealType } from './mealTypeInterfaces';
import { ICategories } from './categoryInterfaces';
export interface IRestaurantFrontEnd {
  name: string;
  id: number;
  phoneNumber: string;
  categories: [ICategories];
  location: ILocation;
  hitRate: number;
}

export interface IRestaurantBackEnd {
  name: string;
  id: number;
  phoneNumber: string;
  dishes: [IDishBE];
  location: ILocation;
  mealType: [IMealType];
  extras: [IDishBE];
}
