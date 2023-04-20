import { ICategories } from '../models/categoryInterfaces';
import { IDishBE, IDishFE } from '../models/dishInterfaces';
import { ILocation } from '../models/locationInterfaces';
import { IMealType } from '../models/mealTypeInterfaces';
import { IOpeningHours, IProducts, IRestaurantBackEnd, IRestaurantFrontEnd }
  from '../models/restaurantInterfaces';
import { readAndGetAllRestaurants } from './connectDataBase';

export default class Filter {
  restaurants: Promise<IRestaurantBackEnd[]>;

  constructor() {
    this.restaurants = this.getAllRestaurants();
  }

  // Create BE object from JSON
  private async getAllRestaurants() {
    const result: IRestaurantBackEnd[] = [];
    const data = await readAndGetAllRestaurants();
    for (const elem of data) {
      const obj = this.createBackEndObj({
        id: elem.id,
        name: elem.name,
        description: elem.description,
        rating: elem.rating,
        ratingCount: elem.ratingCount,
        openingHours: elem.openingHours,
        pictures: elem.pictures,
        products: elem.products,
        website: elem.website,
        phoneNumber: elem.phoneNumber,
        mealType: elem.mealType,
        dishes: elem.dishes,
        location: elem.location,
        extras: elem.extras
      });
      result.push(obj);
    }
    //Sort mealType for frontend by sortId
    for (const elem of result) {
      elem.mealType.sort((a, b) =>
        (a.sortId > b.sortId) ? 1 : -1);
    }
    return result;
  }

  private createBackEndObj(restaurant: IRestaurantBackEnd) {

    const restaurantBE: IRestaurantBackEnd = {
      name: restaurant.name,
      description: restaurant.description,
      id: restaurant.id,
      website: restaurant.website,
      rating: restaurant.rating,
      ratingCount: restaurant.ratingCount,
      phoneNumber: restaurant.phoneNumber,
      pictures: restaurant.pictures,
      openingHours: [{} as IOpeningHours],
      products: [{} as IProducts],
      dishes: [{} as IDishBE],
      location: {} as ILocation,
      mealType: [{} as IMealType],
      extras: [{} as IDishBE],
    };
    restaurantBE.dishes.pop();
    restaurantBE.mealType.pop();
    restaurantBE.extras.pop();
    restaurantBE.products.pop();
    restaurantBE.openingHours.pop();

    let dishId = 0;
    for (const dish of restaurant.dishes) {
      const dishObj: IDishBE = {
        id: dishId,
        name: dish.name,
        description: dish.description,
        products: dish.products,
        pictures: dish.pictures,
        price: dish.price,
        allergens: dish.allergens,
        category: dish.category
      };
      dishId++;
      restaurantBE.dishes.push(dishObj);
    }
    for (const openingHoursElement of restaurant.openingHours) {
      restaurantBE.openingHours.push(openingHoursElement);
    }
    for (const mealTypeElement of restaurant.mealType) {
      restaurantBE.mealType.push(mealTypeElement);
    }
    for (const product of restaurant.products) {
      restaurantBE.products.push(product);
    }
    restaurantBE.location = restaurant.location;
    let extraId = 0;
    for (const extra of restaurant.extras) {
      const extraObj: IDishBE = {
        id: extraId,
        name: extra.name,
        description: extra.description,
        products: extra.products,
        price: extra.price,
        pictures: extra.pictures,
        allergens: extra.allergens,
        category: extra.category
      };
      extraId++;
      restaurantBE.extras.push(extraObj);
    }
    return restaurantBE;
  }

  getRestaurants() {
    return this.restaurants;
  }

  // Create RestaurantObj for Frontend
  createRestaurantObjFe(restaurant: IRestaurantBackEnd, hitRate: number) {
    if (isNaN(hitRate)) hitRate = 0;
    const obj: IRestaurantFrontEnd = {
      name: restaurant.name,
      website: restaurant.website,
      description: restaurant.description,
      rating: restaurant.rating,
      ratingCount: restaurant.ratingCount,
      pictures: restaurant.pictures,
      openingHours: [{} as IOpeningHours],
      products: [{} as IProducts],
      id: restaurant.id,
      phoneNumber: restaurant.phoneNumber,
      categories: [{} as ICategories],
      location: restaurant.location,
      hitRate: hitRate
    };
    obj.categories.pop();
    obj.products.pop();
    obj.openingHours.pop();

    for (const product of restaurant.products) {
      obj.products.push(product);
    }
    for (const openingHoursElement of restaurant.openingHours) {
      obj.openingHours.push(openingHoursElement);
    }

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
            pictures: dish.pictures,
            allergens: dish.allergens,
            category: {
              foodGroup: dish.category.foodGroup,
              extraGroup: dish.category.extraGroup
            },
          };
          categories.dishes.push(dishObj);
        }
      }
      obj.categories.push(categories);
    }
    return obj;
  }

  // Filter for Allergens
  public async filterForRestaurantsWithAllergens(allergens: string[]) {
    const results = [{} as IRestaurantFrontEnd];
    results.pop();

    for (const restaurant of await this.restaurants) {

      let count = 0;

      // Check if restaurant has any dishes with allergens to get hitRate
      for (const dish of restaurant.dishes) {
        count = this.countHitRateAllergens(dish, allergens, count);
      }

      // Create RestaurantObj for Frontend with hitRate
      const obj = this.createRestaurantObjFe(restaurant as IRestaurantBackEnd,
        (1 - (count / restaurant.dishes.length)) * 100);

      // Check if dishes contains allergens (in categories) to get hitRate
      for (const category of obj.categories) {
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

  async filterForRestaurantWithNameOrGroup(lookingFor: string[]) {
    const results = [{} as IRestaurantFrontEnd];
    results.pop();
    for (const restaurant of await this.restaurants) {
      let inserted = false;
      let countName = 0;
      let countGroup = 0;
      let hitRateName = 0;
      let hitRateGroup = 0;
      let max = 0;
      if (lookingFor[0] === '') {
        results.push(this.createRestaurantObjFe(
          restaurant as IRestaurantBackEnd, 100));
        continue;
      }

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
          restaurant as IRestaurantBackEnd,
          Math.max(hitRateName, hitRateGroup)
        ));
      }
    }
    // Sort results by hitRate
    results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
    return results;
  }

  async filterForRestaurantWithRating(lookingFor: number[]) {
    const results = [{} as IRestaurantFrontEnd];
    results.pop();

    for (const restaurant of await this.restaurants) {
      let inserted = false;
      // Check if rating of restaurant is between the two numbers --> return RestaurantObj with 100% hitRate
      if (restaurant.rating >= lookingFor[0] &&
        restaurant.rating <= lookingFor[1]) {
        inserted = true;
        results.push(this.createRestaurantObjFe(
          restaurant as IRestaurantBackEnd, 100));
      }
      // If not inserted directly by rating, create RestaurantObj with hitRate == 0
      if (!inserted) {
        results.push(this.createRestaurantObjFe(
          restaurant as IRestaurantBackEnd, 0));
      }
    }
    results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
    return results;
  }

  async filterForRestaurantWithCategory(lookingFor: string[]) {
    const results = [{} as IRestaurantFrontEnd];
    results.pop();
    for (const restaurant of await this.restaurants) {
      let inserted = false;
      let count = 0;
      const hitRate = 0;
      let max = 0;
      for (const searchedWord of lookingFor) {
        // Check if category of restaurant contains searched word --> return RestaurantObj with 100% hitRate
        // stop if finding category directly
        let hitRate = 0;
        for (const category of restaurant.dishes) {
          if (category.category.foodGroup.toLowerCase()
            .includes(searchedWord.toLowerCase())) {
            count++;
            max = restaurant.dishes.length;
            hitRate = (count / max) * 100;
            results.push(this.createRestaurantObjFe(
              restaurant as IRestaurantBackEnd, hitRate));
            inserted = true;
            break;
          }
        }
      }
      // If not inserted directly by category, create RestaurantObj with hitRate
      if (!inserted) {
        results.push(
          this.createRestaurantObjFe(
            restaurant as IRestaurantBackEnd, hitRate));
      }
    }
    results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
    return results;
  }

  async filterForRestaurantWithLocation(lookingFor: string) {
    const results = [{} as IRestaurantFrontEnd];
    results.pop();
    for (const restaurant of await this.restaurants) {
      let inserted = false;
      if (restaurant.location.city.toLowerCase()
        .includes(lookingFor.toLowerCase())) {
        inserted = true;
        results.push(
          this.createRestaurantObjFe(restaurant as IRestaurantBackEnd, 100));
      }
      if (!inserted) {
        results.push(
          this.createRestaurantObjFe(restaurant as IRestaurantBackEnd, 0));
      }
    }
    results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
    return results;
  }

  // async filterForRestaurantWithRange(lookingFor: number) {
  //   let results = [{} as IRestaurantFrontEnd];
  //   results.pop();
  //   for (let restaurant of await this.restaurants) {
  //     let inserted = false;
  //     if (restaurant.range <= lookingFor) {
  //       inserted = true;
  //       results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
  //     }
  //     if (!inserted) {
  //       results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 0));
  //     }
  //   }
  //   results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
  //   return results;
  // }

  async filterForRestaurantWithAllergen(lookingFor: string[]) {
    const results = [{} as IRestaurantFrontEnd];
    results.pop();
    for (const restaurant of await this.restaurants) {
      let hitRate = 0;
      for (const dish of restaurant.dishes) {
        for (const aller of lookingFor) {
          if (dish.allergens.toLowerCase()
            .includes(aller.toLowerCase())) {
            hitRate = 100;
            break;
          }
        }
        if (hitRate === 100) {
          break;
        }
      }
      if (hitRate === 100) {
        results.push(this.createRestaurantObjFe(
          restaurant as IRestaurantBackEnd, hitRate));
      } else {
        results.push(this.createRestaurantObjFe(
          restaurant as IRestaurantBackEnd, hitRate));
      }
    }
    results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
    return results;
  }

  async returnDefaultQuery() {
    const results = [{} as IRestaurantFrontEnd];
    results.pop();
    for (const restaurant of await this.restaurants) {
      results.push(this.createRestaurantObjFe(
        restaurant as IRestaurantBackEnd, 100));
    }
    return results;
  }
}
