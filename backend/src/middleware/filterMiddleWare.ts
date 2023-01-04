import Filter from '../controllers/restaurantController';
import { ICommunication } from '../models/communicationInterfaces';
import { IFilterObj } from '../models/filterInterfaces';

export const handleFilterRequest = async function(obj: ICommunication) {
  let check = 0;
  const filter = new Filter();
  const result = filter.returnDefaultQuery();
  const tmpFilterObj : IFilterObj = {savedFilter: obj, savedRestaurants: []};

  tmpFilterObj.savedFilter = obj;
  if (obj.name !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter.filterForRestaurantWithNameOrGroup([obj.name]));
    check++;
  }
  if (obj.allergenList !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter.filterForRestaurantsWithAllergens(obj.allergenList));
    check++;
  }
  if (obj.categories !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter.filterForRestaurantWithCategory(obj.categories));
    check++;
  }
  if (obj.rating !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter.filterForRestaurantWithRating(obj.rating));
    check++;
  }
  // if (obj.range !== undefined) {
  //   tmpFilterObj.savedRestaurants.push(await filter.filterForRestaurantWithRange(obj.range));
  //   check++;
  // }

  if (obj.location !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter.filterForRestaurantWithLocation(obj.location));
    check++;
  }
  // compare all hitrates in tmpFilterObj and return IRestaurantFrontEnd[] with average hitRate
  if (check >= 1) {
    for (let i = 0; i < (await result).length; i++) {
      let hitrate = 0;
      for (let x = 0; x < tmpFilterObj.savedRestaurants.length; x++) {
        for (let y = 0; y < tmpFilterObj.savedRestaurants[x].length; y++) {
          if ((await result)[i].id === tmpFilterObj.savedRestaurants[x][y].id) {
            hitrate += tmpFilterObj.savedRestaurants[x][y].hitRate;
          }
        }
      }
      hitrate /= tmpFilterObj.savedRestaurants.length;
      (await result)[i].hitRate = hitrate;
    }
    (await result).sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
  }
  return result;
};
