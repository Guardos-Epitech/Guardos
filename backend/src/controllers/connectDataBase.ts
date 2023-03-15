import * as process from 'process';
import * as dotenv from 'dotenv';

import {IRestaurantBackEnd, restaurantSchema}
  from '../models/restaurantInterfaces';

const mongoose = require('mongoose');  /* eslint-disable-line */

export const SUCCEED = 1;
export const FAILED = -1;

export async function connectDataBase() {
  dotenv.config();
  const userName = process.env.dbUser;
  const password = process.env.dbPassword;
  const cluster = process.env.dbCluster;
  const uri = `mongodb+srv://${userName}:${password}@${cluster}/Guardos?retryWrites=true&w=majority`;

  try {
    console.log('Connecting to database...');
    mongoose.set('strictQuery', false);
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.connection.once('open', async () => {
      console.log('Connected to Database');
    });
    return SUCCEED;
  } catch (e) {
    console.error(e);
    return FAILED;
  }
}

export async function createNewRestaurant(obj: IRestaurantBackEnd, id: number) {
  const RestaurantSchema = mongoose.model('Restaurants', restaurantSchema);
  const upload = new RestaurantSchema({
    _id: id,
    name: obj.name,
    phoneNumber: obj.phoneNumber,
    website: obj.website,
    rating: obj.rating,
    ratingCount: obj.ratingCount,
    description: obj.description,
    dishes: obj.dishes,
    pictures: obj.pictures,
    openingHours: obj.openingHours,
    location: obj.location,
    mealType: obj.mealType,
    products: obj.products,
    extras: obj.extras,
  });
  upload.save();
  console.log('Restaurant ' + obj.name + ' saved ' + ' with id ' + id);
}

export async function readAndGetAllRestaurants() {
  console.log('Reading all restaurants');
  const RestaurantSchema = mongoose.model('Restaurants', restaurantSchema);
  return await RestaurantSchema.find();
}
