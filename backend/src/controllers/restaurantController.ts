import dummyDataRestaurants from '../assets/restaurants.json';
import { IRestaurantBackEnd, IRestaurantFrontEnd }
  from '../models/restaurantInterfaces';
import { IDishBE, IDishFE } from '../models/dishInterfaces';
import { ICategories } from '../models/categoryInterfaces';
import { ILocation } from '../models/locationInterfaces';
import { IMealType } from '../models/mealTypeInterfaces';

export default class Filter {
  restaurants;

  constructor() {
    this.restaurants = this.getAllRestaurantsOfJSON();
  }

  // Create BE object from JSON
  private getAllRestaurantsOfJSON() {
    const result : IRestaurantBackEnd[] = [];
    result.pop();
    for (const elem of dummyDataRestaurants.restaurants) {
      const obj = this.createBackEndObj({id: elem.id, name: elem.name,
        phoneNumber: elem.phoneNumber, mealType: elem.mealType as any,  /* eslint-disable-line */
        dishes: elem.dishes as any, location: elem.location,  /* eslint-disable-line */
        extras: elem.extras as any});  /* eslint-disable-line */
      result.push(obj);
    }
    //Sort mealType for frontend by sortId
    for (const elem of result) {
      elem.mealType.sort((a, b) =>
        (a.sortId > b.sortId) ? 1 : -1);
    }
    return result;
  }

  private createBackEndObj(restaurant: {
    id: number;
    name: string;
    phoneNumber: string;
    mealType: [IMealType];
    dishes: [IDishBE];
    location: ILocation;
    extras: [IDishBE] }) {

    const obj: IRestaurantBackEnd = {
      name: restaurant.name,
      id: restaurant.id,
      phoneNumber: restaurant.phoneNumber,
      dishes: [{} as IDishBE],
      location: {} as ILocation,
      mealType: [{} as IMealType],
      extras: [{} as IDishBE]
    };
    obj.dishes.pop();
    obj.mealType.pop();
    obj.extras.pop();
    for (const dish of restaurant.dishes) {
      const dishObj: IDishBE = {
        name: dish.name,
        description: dish.description,
        price: dish.price,
        allergens: dish.allergens,
        category: dish.category
      };
      obj.dishes.push(dishObj);
    }
    for (const mealTypeElement of restaurant.mealType) {
      obj.mealType.push(mealTypeElement);
    }
    for (const extra of restaurant.extras) {
      const extraObj: IDishBE = {
        name: extra.name,
        description: extra.description,
        price: extra.price,
        allergens: extra.allergens,
        category: extra.category
      };

      obj.extras.push(extraObj);
    }
    return obj;
  }

  getRestaurants() {
    return this.restaurants;
  }

  // Create RestaurantObj for Frontend
  createRestaurantObjFe(restaurant: IRestaurantBackEnd, hitRate: number) {
    if (isNaN(hitRate))
      hitRate = 0;
    const obj: IRestaurantFrontEnd = {
      name: restaurant.name,
      id: restaurant.id,
      phoneNumber: restaurant.phoneNumber,
      categories: [{} as ICategories],
      location: restaurant.location,
      hitRate: hitRate
    };
    obj.categories.pop();

    for (const x of restaurant.mealType) {
      const categories: ICategories = {
        name: x.name,
        hitRate: 0,
        dishes: [{} as IDishFE]
      };
      categories.dishes.pop();
      for (const dish of restaurant.dishes) {
        if (dish.category.menuGroup === x.name) {
          const dishObj: IDishFE = {
            name: dish.name,
            description: dish.description,
            price: dish.price,
            allergens: dish.allergens,
            category: {
              foodGroup: dish.category.foodGroup,
              extraGroup: dish.category.extraGroup},
          };
          categories.dishes.push(dishObj);
        }
      }
      obj.categories.push(categories);
    }
    return obj;
  }

  // Filter for Allergens
  public filterForRestaurantsWithAllergens(allergens: string[]) {
    const results = [{} as IRestaurantFrontEnd];
    results.pop();

    for (const restaurant of this.restaurants) {
      let count = 0;

      // Check if restaurant has any dishes with allergens to get hitRate
      for (const dish of restaurant.dishes) {
        count = this.countHitRateAllergens(dish, allergens, count);
      }

      // Create RestaurantObj for Frontend with hitRate
      const obj = this.createRestaurantObjFe(restaurant as IRestaurantBackEnd,
        (1 - (count / restaurant.dishes.length)) * 100);

      // Check if dishes contains allergens (in categories) to get hitRate
      for (const category of obj.categories){
        for (const dish of category.dishes) {
          count = this.countHitRateAllergens(dish, allergens, count);
        }
        category.hitRate = (1 - (count / category.dishes.length)) * 100;
      }
      results.push(obj);
    }
    // Sort results by hitRate
    results.sort((a, b) =>
      (a.hitRate < b.hitRate) ? 1 : -1);
    return results;
  }

  // Count how often an allergen is in a dish
  private countHitRateAllergens(
    dish: IDishFE, allergens: string[], count: number) {

    let hitControl = 0;
    for (const allergen of dish.allergens.split(',')) {
      for (const lookingFor of allergens) {
        if (allergen.toLowerCase()
          .includes(lookingFor.toLowerCase())) {
          count++;
          hitControl++;
        }
      }
    }
    if (hitControl > 0) {
      count = count - (hitControl - 1);
    }
    return count;
  }

  filterForRestaurantWithNameOrGroup(lookingFor: string[]) {
    const results =  [{} as IRestaurantFrontEnd];
    results.pop();
    for (const restaurant of this.restaurants) {
      let inserted = false;
      let countName = 0;
      let countGroup = 0;
      let hitRateName = 0;
      let hitRateGroup = 0;
      let max = 0;
      for (const searchedWord of lookingFor) {
        // Check if name of restaurant contains searched word --> return RestaurantObj with 100% hitRate
        // stop if finding name directly
        if (restaurant.name.toLowerCase()
          .includes(searchedWord.toLowerCase())) {
          results.push(this.createRestaurantObjFe(
            restaurant as IRestaurantBackEnd, 100));

          inserted = true;
          break;
        }

        // Check if name of the dish contains searched word --> calculate hitRate
        for (const dish of restaurant.dishes) {
          let found = false;
          if (dish.name.toLowerCase()
            .includes(searchedWord.toLowerCase())) {
            countName++;
            hitRateName = (countName / restaurant.dishes.length) * 100;
            found = true;
          }
          // Check if foodGroup of the dish contains searched word --> calculate hitRate
          for (const group of dish.category.foodGroup.split(',')) {
            if (found)
              break;
            if (group.toLowerCase()
              .includes(searchedWord.toLowerCase())) {
              max = dish.category.foodGroup.split(',').length;
              countGroup++;
              hitRateGroup = (countGroup / max) * 100;
              found = true;
            }
          }
        }

      }
      // If not inserted directly by name, create RestaurantObj with hitRate
      if (!inserted) {
        results.push(this.createRestaurantObjFe(
          restaurant as IRestaurantBackEnd, Math.max(hitRateName,
            hitRateGroup)));
      }
    }

    // Sort results by hitRate
    results.sort((a, b) =>
      (a.hitRate < b.hitRate) ? 1 : -1);
    return results;
  }
}
