import Filter from '../controllers/restaurantController';
import { ICommunication } from '../models/communicationInterfaces';
import { IFilterObj } from '../models/filterInterfaces';

export const handleFilterRequest = async function(filterReq: ICommunication) {
  let check = 0;
  const filter = new Filter();
  const result = filter.returnDefaultQuery();
  const tmpFilterObj : IFilterObj = {savedFilter: filterReq,
    savedRestaurants: []};

  tmpFilterObj.savedFilter = filterReq;
  if (filterReq.name !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter
        .filterForRestaurantWithNameOrGroup([filterReq.name]));
    check++;
  }
  if (filterReq.allergenList !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter
        .filterForRestaurantsWithAllergens(filterReq.allergenList));
    check++;
  }
  if (filterReq.categories !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter.filterForRestaurantWithCategory(filterReq.categories));
    check++;
  }
  if (filterReq.rating !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter.filterForRestaurantWithRating(filterReq.rating));
    check++;
  }
  // if (obj.range !== undefined) {
  //   tmpFilterObj.savedRestaurants.push(await filter.filterForRestaurantWithRange(obj.range));
  //   check++;
  // }

  if (filterReq.location !== undefined) {
    tmpFilterObj.savedRestaurants
      .push(await filter.filterForRestaurantWithLocation(filterReq.location));
    check++;
  }
  // compare all hitrates in tmpFilterObj and return IRestaurantFrontEnd[] with average hitRate
  if (check >= 1) {
    for (let i = 0; i < (await result).length; i++) {
      let hitrate = 0;
      for (const restaurants of tmpFilterObj.savedRestaurants) {
        for (const restaurant of restaurants) {
          if (restaurant.id === (await result)[i].id) {
            hitrate += restaurant.hitRate;
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
