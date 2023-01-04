import { ILocation } from './locationInterfaces';
import { IDishBE } from './dishInterfaces';
import { IMealType } from './mealTypeInterfaces';
import { ICategories } from './categoryInterfaces';
import mongoose from 'mongoose';

export interface IProducts{
  name: string;
  allergens: string;
  ingredients: [string];
}

//0 == Monday, 1 == Tuesday, 2 == Wednesday, 3 == Thursday, 4 == Friday, 5 == Saturday, 6 == Sunday
// 7 == Alldays
export interface IOpeningHours{
  open: string;
  close: string;
  day:number;
}

export interface IRestaurantFrontEnd {
  name: string;
  id: number;
  phoneNumber: string;
  website: string;
  description: string;
  categories: [ICategories];
  location: ILocation;
  openingHours: [IOpeningHours];
  pictures: [string];
  hitRate: number;
  rating: number;
  products: [IProducts];
}

export interface IRestaurantBackEnd {
  id: number;
  name: string;
  phoneNumber: string;
  website: string;
  rating: number;
  ratingCount: number;
  openingHours: [IOpeningHours];
  pictures: [string];
  description: string;
  dishes: [IDishBE];
  location: ILocation;
  mealType: [IMealType];
  extras: [IDishBE];
  products: [IProducts];
}


//Database structure for restaurants
export const restaurantSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  phoneNumber: String,
  rating: Number,
  ratingCount: Number,
  website: String,
  openingHours: [{
    open: String,
    close: String,
    day: Number,
  }],
  pictures: [String],
  description: String,
  dishes: [{
    _id: Number,
    name: String,
    description: String,
    products: [String],
    pictures: [String],
    price: Number,
    allergens: String,
    category: {
      menuGroup: String,
      foodGroup: String,
      extraGroup: String,
    },
  }],
  location: {
    streetName: String,
    streetNumber: String,
    postalCode: String,
    country: String,
    city: String,
  },
  mealType: [{
    name: String,
    _id: Number,
    sortId: Number,
  }],
  extras: [{
    name: String,
    _id: Number,
    description: String,
    price: Number,
    pictures: [String],
    allergens: String,
    products: [String],
    category: {
      menuGroup: String,
      foodGroup: String,
      extraGroup: String,
    },
  }],
  products: [{
    name: String,
    allergens: String,
    ingredients: [String],
  }],
});
