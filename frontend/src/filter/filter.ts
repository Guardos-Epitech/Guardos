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

// class FilterQuery {
//     filter;
//     restaurants;
//
//     constructor() {
//         this.filter = dummyDataFilter;
//         this.restaurants = this.getAllRestaurantsOfJSON();
//     }
//
//     // Create BE object from JSON
//     getAllRestaurantsOfJSON() {
//         const result : IRestaurantBackEnd[] = [];
//         result.pop();
//         for (const elem of dummyDataRestaurants.restaurants) {
//             const obj: IRestaurantBackEnd = {
//                 name: elem.name,
//                 id: elem.id,
//                 rating: elem.rating,
//                 phoneNumber: elem.phoneNumber,
//                 description: elem.description,
//                 range: elem.range,
//                 dishes: [{} as IDishBE],
//                 location: {} as ILocation,
//                 mealType: [{} as IMealType],
//                 extra: [{} as IDishBE]
//             }
//             obj.dishes.pop();
//             obj.mealType.pop();
//             obj.extra.pop();
//             for (const dish of elem.dishes) {
//                 const dishObj: IDishBE = {
//                     name: dish.name,
//                     description: dish.description,
//                     price: dish.price,
//                     allergens: dish.allergens,
//                     category: dish.category
//                 }
//                 obj.dishes.push(dishObj);
//             }
//             for (const mealTypeElement of elem.mealType) {
//                 obj.mealType.push(mealTypeElement);
//             }
//             for (const extra of elem.extras) {
//                 const extraObj: IDishBE = {
//                     name: extra.name,
//                     description: extra.description,
//                     price: extra.price,
//                     allergens: extra.allergens,
//                     category: extra.category
//                 }
//
//                 obj.extra.push(extraObj);
//             }
//
//             obj.location.city = elem.location.city;
//             obj.location.country = elem.location.country;
//             obj.location.postalCode = elem.location.postalCode;
//             obj.location.streetName = elem.location.streetName;
//             obj.location.streetNumber = elem.location.streetNumber;
//
//
//             result.push(obj);
//         }
//         //Sort mealType for frontend by sortId
//         for (const elem of result) {
//             elem.mealType.sort((a, b) => (a.sortId > b.sortId) ? 1 : -1);
//         }
//         return result;
//     }
//
//     getFilter() {
//         return this.filter;
//     }
//
//     getRestaurants() {
//         return this.restaurants;
//     }
//
//     // Create RestaurantObj for Frontend
//     private createRestaurantObj(restaurant: IRestaurantBackEnd, hitRate: number) {
//         if (isNaN(hitRate))
//             hitRate = 0;
//         const obj: IRestaurantFrontEnd = {
//             name: restaurant.name,
//             id: restaurant.id,
//             rating: restaurant.rating,
//             range: restaurant.range,
//             description: restaurant.description,
//             phoneNumber: restaurant.phoneNumber,
//             categories: [{} as ICategories],
//             location: restaurant.location,
//             hitRate: hitRate,
//             dishes: restaurant.dishes
//         };
//         obj.categories.pop();
//
//         for (const x of restaurant.mealType) {
//             const categories: ICategories = {
//                 name: x.name,
//                 hitRate: 0,
//                 dishes: [{} as IDishFE]
//             }
//             categories.dishes.pop();
//             for (const dish of restaurant.dishes) {
//                 if (dish.category.menuGroup === x.name) {
//                     const dishObj: IDishFE = {
//                         name: dish.name,
//                         description: dish.description,
//                         price: dish.price,
//                         allergens: dish.allergens,
//                         category: {foodGroup: dish.category.foodGroup, extraGroup: dish.category.extraGroup},
//                     }
//                     categories.dishes.push(dishObj);
//                 }
//             }
//             obj.categories.push(categories);
//         }
//         return obj;
//     }
//
//     // Filter for Allergens
//     filterForRestaurantsWithAllergens(allergens: string[]) {
//         const results = [{} as IRestaurantFrontEnd];
//         results.pop();
//
//         for (const restaurant of this.restaurants) {
//             let count = 0;
//
//             // Check if restaurant has any dishes with allergens to get hitRate
//             for (const dish of restaurant.dishes) {
//                 count = this.countHitRateAllergens(dish, allergens, count);
//             }
//
//             // Create RestaurantObj for Frontend with hitRate
//             const obj = this.createRestaurantObj(restaurant as IRestaurantBackEnd,
//                 (1 - (count / restaurant.dishes.length)) * 100);
//
//             // Check if dishes contains allergens (in categories) to get hitRate
//             for (const category of obj.categories){
//                 for (const dish of category.dishes) {
//                     count = this.countHitRateAllergens(dish, allergens, count);
//                 }
//                 category.hitRate = (1 - (count / category.dishes.length)) * 100;
//             }
//             results.push(obj);
//         }
//         // Sort results by hitRate
//         results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
//         return results;
//     }
//
//     // Count how often an allergen is in a dish
//     private countHitRateAllergens(dish: IDishFE, allergens: string[], count: number) {
//         let hitControl = 0;
//         for (const allergen of dish.allergens.split(',')) {
//             for (const lookingFor of allergens) {
//                 if (allergen.toLowerCase().includes(lookingFor.toLowerCase())) {
//                     count++;
//                     hitControl++;
//                 }
//             }
//         }
//         if (hitControl > 0) {
//             count = count - (hitControl - 1);
//         }
//         return count;
//     }
//
//     filterForRestaurantWithNameOrGroup(lookingFor: string[]) {
//         const results =  [{} as IRestaurantFrontEnd];
//         results.pop();
//         for (const restaurant of this.restaurants) {
//             let inserted = false;
//             let countName = 0;
//             let countGroup = 0;
//             let hitRateName = 0;
//             let hitRateGroup = 0;
//             let max = 0;
//             for (const searchedWord of lookingFor) {
//                 // Check if name of restaurant contains searched word --> return RestaurantObj with 100% hitRate
//                 // stop if finding name directly
//                 if (restaurant.name.toLowerCase().includes(searchedWord.toLowerCase())) {
//                     results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
//                     inserted = true;
//                     break;
//                 }
//
//                 // Check if name of the dish contains searched word --> calculate hitRate
//                 for (const dish of restaurant.dishes) {
//                     let found = false;
//                     if (dish.name.toLowerCase().includes(searchedWord.toLowerCase())) {
//                         countName++;
//                         hitRateName = (countName / restaurant.dishes.length) * 100;
//                         found = true;
//                     }
//                     // Check if foodGroup of the dish contains searched word --> calculate hitRate
//                     for (const group of dish.category.foodGroup.split(',')) {
//                         if (found)
//                             break;
//                         if (group.toLowerCase().includes(searchedWord.toLowerCase())) {
//                             max = dish.category.foodGroup.split(',').length;
//                             countGroup++;
//                             hitRateGroup = (countGroup / max) * 100;
//                             found = true;
//                         }
//                     }
//                 }
//
//             }
//             // If not inserted directly by name, create RestaurantObj with hitRate
//             if (!inserted) {
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, Math.max(hitRateName,
//                     hitRateGroup)));
//             }
//         }
//         // Sort results by hitRate
//         results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
//         return results;
//     }
//
//     filterForRestaurantWithRating(lookingFor: number[]) {
//         let results =  [{} as IRestaurantFrontEnd];
//         results.pop();
//
//         for (let restaurant of this.restaurants) {
//             let inserted = false;
//             // Check if rating of restaurant is between the two numbers --> return RestaurantObj with 100% hitRate
//             if (restaurant.rating >= lookingFor[0] && restaurant.rating <= lookingFor[1]) {
//                 inserted = true;
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
//             }
//             // If not inserted directly by rating, create RestaurantObj with hitRate == 0
//             if (!inserted) {
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 0));
//             }
//         }
//         results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
//         return results;
//     }
//
//     filterForRestaurantWithCategory(lookingFor: string[]) {
//         let results =  [{} as IRestaurantFrontEnd];
//         results.pop();
//         for (let restaurant of this.restaurants) {
//             let inserted = false;
//             let count = 0;
//             let hitRate = 0;
//             let max = 0;
//             for (let searchedWord of lookingFor) {
//                 // Check if category of restaurant contains searched word --> return RestaurantObj with 100% hitRate
//                 // stop if finding category directly
//                 let hitRate = 0;
//                 for (let category of restaurant.dishes) {
//                     if (category.category.foodGroup.toLowerCase().includes(searchedWord.toLowerCase())) {
//                         count++;
//                         max = restaurant.dishes.length;
//                         hitRate = (count / max) * 100;
//                         results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, hitRate));
//                         inserted = true;
//                         break;
//                     }
//                 }
//             }
//             // If not inserted directly by category, create RestaurantObj with hitRate
//             if (!inserted) {
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, hitRate));
//             }
//         }
//         results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
//         return results;
//     }
//
//     filterForRestaurantWithLocation(lookingFor: string) {
//         let results = [{} as IRestaurantFrontEnd];
//         results.pop();
//         for (let restaurant of this.restaurants) {
//             let inserted = false;
//             if (restaurant.location.city.toLowerCase().includes(lookingFor.toLowerCase())) {
//                 inserted = true;
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
//             }
//             if (!inserted) {
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 0));
//             }
//         }
//         results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
//         return results;
//     }
//
//     filterForRestaurantWithRange(lookingFor: number) {
//         let results = [{} as IRestaurantFrontEnd];
//         results.pop();
//         for (let restaurant of this.restaurants) {
//             let inserted = false;
//             if (restaurant.range <= lookingFor) {
//                 inserted = true;
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
//             }
//             if (!inserted) {
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 0));
//             }
//         }
//         results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
//         return results;
//     }
//
//     filterForRestaurantWithAllergen(lookingFor: Array<string>) {
//         let results = [{} as IRestaurantFrontEnd];
//         results.pop();
//         for (let restaurant of this.restaurants) {
//             let hitrate = 0;
//             for (let dish of restaurant.dishes) {
//                 for (let allergen of lookingFor) {
//                     if (dish.allergens.toLowerCase().includes(allergen.toLowerCase())) {
//                         hitrate = 100;
//                         break;
//                     }
//                 }
//                 if (hitrate == 100) {
//                     break;
//                 }
//             }
//             if (hitrate == 100) {
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, hitrate));
//             } else {
//                 results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, hitrate));
//             }
//         }
//         results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
//         return results;
//     }
//
//     returnDefaultQuery() {
//         let results = [{} as IRestaurantFrontEnd];
//         results.pop();
//         for (let restaurant of this.restaurants) {
//             results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
//         }
//         return results;
//     }
// }
//
// export const handleFilterRequest = (obj: IFilterObject) => {
//     let check = 0;
//     let filter = new FilterQuery();
//     let result = filter.returnDefaultQuery();
//     let tmpFilterObj : IFilterObj;
//     tmpFilterObj = {savedFilter: obj, savedRestaurants: []};
//     tmpFilterObj.savedFilter = obj;
//     if (obj.name !== undefined) {
//         tmpFilterObj.savedRestaurants.push(filter.filterForRestaurantWithNameOrGroup([obj.name]));
//         check++;
//     }
//     if (obj.allergenList !== undefined) {
//         tmpFilterObj.savedRestaurants.push(filter.filterForRestaurantsWithAllergens(obj.allergenList));
//         check++;
//     }
//     if (obj.categories !== undefined) {
//         tmpFilterObj.savedRestaurants.push(filter.filterForRestaurantWithCategory(obj.categories));
//         check++;
//     }
//     if (obj.rating !== undefined) {
//         tmpFilterObj.savedRestaurants.push(filter.filterForRestaurantWithRating(obj.rating));
//         check++;
//     }
//     if (obj.range !== undefined) {
//         tmpFilterObj.savedRestaurants.push(filter.filterForRestaurantWithRange(obj.range));
//         check++;
//     }
//     if (obj.location !== undefined) {
//         tmpFilterObj.savedRestaurants.push(filter.filterForRestaurantWithLocation(obj.location));
//         check++;
//     }
//     // compare all hitrates in tmpFilterObj and return IRestaurantFrontEnd[] with average hitRate
//     if (check >= 1) {
//         for (let i = 0; i < result.length; i++) {
//             let hitrate = 0;
//             for (let x = 0; x < tmpFilterObj.savedRestaurants.length; x++) {
//                 for (let y = 0; y < tmpFilterObj.savedRestaurants[x].length; y++) {
//                     if (result[i].id == tmpFilterObj.savedRestaurants[x][y].id) {
//                         hitrate += tmpFilterObj.savedRestaurants[x][y].hitRate;
//                     }
//                 }
//             }
//             hitrate /= tmpFilterObj.savedRestaurants.length;
//             result[i].hitRate = hitrate;
//         }
//         result.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
//     }
//     return result;
// }
//
// function printResults(results: IRestaurantFrontEnd[]) {
//     for (let result of results) {
//         console.log(result);
//     }
// }
//
// export function testFilter() {
//     const commObjAll: IFilterObject = {
//         name: 'stone',
//         allergenList: ['gluten', 'lactose'],
//         categories: ['maindish'],
//         location: 'Berlin',
//         range: 0,
//         rating: [0,5],
//     }
//     handleFilterRequest(commObjAll);
// }

// export default FilterQuery;