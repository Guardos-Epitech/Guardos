import { getEnv } from './getEnv';
import { IRestaurantBackEnd, restaurantSchema }
  from '../models/restaurantInterfaces';
import filter from '../controllers/restaurantController';

const mongoose = require('mongoose');  /* eslint-disable-line */

export default async function connectDataBase() {
  const env = getEnv();
  const url = env.dbUrl;
  const userName = env.dbUser;
  const password = env.dbPassword;
  const cluster = env.dbCluster;
  let uri = url.replace('aaa', userName);
  uri = uri.replace('bbb', password);
  uri = uri.replace('ccc', cluster) + '?retryWrites=true&w=majority';
  try {
    console.log('Connecting to database...');
    mongoose.set('strictQuery', false);
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.connection.once('open', async () => {
      console.log('Connected to Database');
      const restaurants = new filter();
      let count = 0;
      for (const restaurant of await restaurants.restaurants) {
        await createNewRestaurant(restaurant, count);
        count++;
      }
    });
    return 1;
  } catch (e) {
    console.error(e);
    return -1;
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
  console.log(upload.location);
  upload.save();

  console.log('Restaurant ' + obj.name + ' saved ' + ' with id ' + id);

}

export async function getAllRestaurants() {
  const RestaurantSchema = mongoose.model('Restaurants', restaurantSchema);
  return await RestaurantSchema.find();
}
