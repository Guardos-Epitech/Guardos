import { Request } from 'express';
import Filter from '../controllers/restaurantController';
import DataBase from '../controllers/connectDataBase';

export const filterRestaurants = (req: Request) => {
  const filter = new Filter();
  if (req.body.allergens !== undefined) {
    let prepare = req.body.allergens.split('[');
    prepare = prepare[1].split(']');
    const allergens = prepare[0].split(',');
    return filter.filterForRestaurantsWithAllergens(allergens);
  }
  if (req.body.name !== undefined) {
    let prepare = req.body.name.split('[');
    prepare = prepare[1].split(']');
    const name = prepare[0].split(',');
    return filter.filterForRestaurantWithNameOrGroup(name);
  }
  if (req.body.group !== undefined)  {
    let prepare = req.body.group.split('[');
    prepare = prepare[1].split(']');
    const group = prepare[0].split(',');
    return filter.filterForRestaurantWithNameOrGroup(group);
  }
  return 'Coudnt find any filter';
};
