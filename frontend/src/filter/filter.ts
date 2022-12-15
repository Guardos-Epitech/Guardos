import dummyDataFilter from './filterData.json';
import dummyDataRestaurants from './restaurants.json';

interface ICommunicationObject {
    allergenList?: string[];
    location?: string;
    name?: string;
    rating?: number[];
    range?: number;
    categories?: string[];
}

interface ICategories {
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
}

interface IDishBE {
    name: string;
    description: string;
    price: number;
    allergens: string;
    category: ICategoryBE;
}

interface IDishFE {
    name: string;
    description: string;
    price: number;
    allergens: string;
    category: ICategoryFE;
}

export interface IRestaurantFrontEnd {
    name: string;
    id: number;
    phoneNumber: string;
    categories: [ICategories];
    location: ILocation;
    rating: number;
    hitRate: number;
}

export interface IRestaurantBackEnd {
    name: string;
    id: number;
    phoneNumber: string;
    rating: number;
    dishes: [IDishBE];
    location: ILocation;
    mealType: [IMealType];
    extra: [IDishBE];
}

export default class Filter {
    filter;
    restaurants;

    constructor() {
        this.filter = dummyDataFilter;
        this.restaurants = this.getAllRestaurantsOfJSON();
    }

    // Create BE object from JSON
    getAllRestaurantsOfJSON() {
        let result : IRestaurantBackEnd[] = [];
        result.pop();
        for (let elem of dummyDataRestaurants.restaurants) {
            let obj: IRestaurantBackEnd = {
                name: elem.name,
                id: elem.id,
                rating: elem.rating,
                phoneNumber: elem.phoneNumber,
                dishes: [{} as IDishBE],
                location: {} as ILocation,
                mealType: [{} as IMealType],
                extra: [{} as IDishBE]
            }
            obj.dishes.pop();
            obj.mealType.pop();
            obj.extra.pop();
            for (let dish of elem.dishes) {
                let dishObj: IDishBE = {
                    name: dish.name,
                    description: dish.description,
                    price: dish.price,
                    allergens: dish.allergens,
                    category: dish.category
                }
                obj.dishes.push(dishObj);
            }
            for (let mealTypeElement of elem.mealType) {
                obj.mealType.push(mealTypeElement);
            }
            for (let extra of elem.extras) {
                let extraObj: IDishBE = {
                    name: extra.name,
                    description: extra.description,
                    price: extra.price,
                    allergens: extra.allergens,
                    category: extra.category
                }

                obj.extra.push(extraObj);
            }
            result.push(obj);
        }
        //Sort mealType for frontend by sortId
        for (let elem of result) {
            elem.mealType.sort((a, b) => (a.sortId > b.sortId) ? 1 : -1);
        }
        return result;
    }

    getFilter() {
        return this.filter;
    }

    getRestaurants() {
        return this.restaurants;
    }

    // Create RestaurantObj for Frontend
    private createRestaurantObj(restaurant: IRestaurantBackEnd, hitRate: number) {
        if (isNaN(hitRate))
            hitRate = 0;
        let obj: IRestaurantFrontEnd = {
            rating: restaurant.rating,
            name: restaurant.name,
            id: restaurant.id,
            phoneNumber: restaurant.phoneNumber,
            categories: [{} as ICategories],
            location: restaurant.location,
            hitRate: hitRate
        };
        obj.categories.pop();

        for (let x of restaurant.mealType) {
            let categories: ICategories = {
                name: x.name,
                hitRate: 0,
                dishes: [{} as IDishFE]
            }
            categories.dishes.pop();
            for (let dish of restaurant.dishes) {
                if (dish.category.menuGroup === x.name) {
                    let dishObj: IDishFE = {
                        name: dish.name,
                        description: dish.description,
                        price: dish.price,
                        allergens: dish.allergens,
                        category: {foodGroup: dish.category.foodGroup, extraGroup: dish.category.extraGroup},
                    }
                    categories.dishes.push(dishObj);
                }
            }
            obj.categories.push(categories);
        }
        return obj;
    }

    // Filter for Allergens
    filterForRestaurantsWithAllergens(allergens: string[]) {
        let results = [{} as IRestaurantFrontEnd];
        results.pop();

        for (let restaurant of this.restaurants) {
            let count = 0;

            // Check if restaurant has any dishes with allergens to get hitRate
            for (let dish of restaurant.dishes) {
                count = this.countHitRateAllergens(dish, allergens, count);
            }

            // Create RestaurantObj for Frontend with hitRate
            let obj = this.createRestaurantObj(restaurant as IRestaurantBackEnd,
                (1 - (count / restaurant.dishes.length)) * 100);

            // Check if dishes contains allergens (in categories) to get hitRate
            for (let category of obj.categories){
                for (let dish of category.dishes) {
                    count = this.countHitRateAllergens(dish, allergens, count);
                }
                category.hitRate = (1 - (count / category.dishes.length)) * 100;
            }
            results.push(obj);
        }
        // Sort results by hitRate
        results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
        return results;
    }

    // Count how often an allergen is in a dish
    private countHitRateAllergens(dish: IDishFE, allergens: string[], count: number) {
        let hitControl = 0;
        for (let allergen of dish.allergens.split(',')) {
            for (let lookingFor of allergens) {
                if (allergen.toLowerCase().includes(lookingFor.toLowerCase())) {
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
        let results =  [{} as IRestaurantFrontEnd];
        results.pop();
        for (let restaurant of this.restaurants) {
            let inserted = false;
            let countName = 0;
            let countGroup = 0;
            let hitRateName = 0;
            let hitRateGroup = 0;
            let max = 0;
            for (let searchedWord of lookingFor) {
                // Check if name of restaurant contains searched word --> return RestaurantObj with 100% hitRate
                // stop if finding name directly
                if (restaurant.name.toLowerCase().includes(searchedWord.toLowerCase())) {
                    results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
                    inserted = true;
                    break;
                }

                // Check if name of the dish contains searched word --> calculate hitRate
                for (let dish of restaurant.dishes) {
                    let found = false;
                    if (dish.name.toLowerCase().includes(searchedWord.toLowerCase())) {
                        countName++;
                        hitRateName = (countName / restaurant.dishes.length) * 100;
                        found = true;
                    }
                    // Check if foodGroup of the dish contains searched word --> calculate hitRate
                    for (let group of dish.category.foodGroup.split(',')) {
                        if (found)
                            break;
                        if (group.toLowerCase().includes(searchedWord.toLowerCase())) {
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
                results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, Math.max(hitRateName,
                    hitRateGroup)));
            }
        }

        // Sort results by hitRate
        results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
        return results;
    }

    filterForRestaurantWithRating(lookingFor: Number[]) {
        let results =  [{} as IRestaurantFrontEnd];
        results.pop();

        for (let restaurant of this.restaurants) {
            let inserted = false;
            // Check if rating of restaurant is between the two numbers --> return RestaurantObj with 100% hitRate
            if (restaurant.rating >= lookingFor[0] && restaurant.rating <= lookingFor[1]) {
                inserted = true;
                results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
            }
            // If not inserted directly by rating, create RestaurantObj with hitRate == 0
            if (!inserted) {
                results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 0));
            }
        }
        results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
        return results;
    };

    filterForRestaurantWithLocation(lookingFor: string) {
        let results = [{} as IRestaurantFrontEnd];
        results.pop();
        for (let restaurant of this.restaurants) {
            let inserted = false;
            for (let location of restaurant.location.postalCode) {
                if (location == lookingFor) {
                    inserted = true;
                    results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 100));
                }
            }
            if (!inserted) {
                results.push(this.createRestaurantObj(restaurant as IRestaurantBackEnd, 0));
            }
        }
        results.sort((a, b) => (a.hitRate < b.hitRate) ? 1 : -1);
        return results;
    };
}

function handleFilterRequest(obj: ICommunicationObject) {
    let check = 0;
    let filter = new Filter();
    let restaurants = filter.getRestaurants();
    let result = [{} as IRestaurantFrontEnd];
    let tmpFilterObj : IRestaurantFrontEnd[];
    let ratingResult = [] as Number[];
    result.pop();

    if (obj.name !== undefined) {
        check++;
        tmpFilterObj = filter.filterForRestaurantWithNameOrGroup([obj.name]);
        console.log('Filter after name: ');
        printResults(tmpFilterObj);
    }
    if (obj.allergenList !== undefined) {
        check++;
        tmpFilterObj = filter.filterForRestaurantsWithAllergens(obj.allergenList);
        console.log('Filter after allergens:');
        printResults(tmpFilterObj);
    }
    if (obj.categories !== undefined) {
        check++;
        tmpFilterObj = filter.filterForRestaurantWithNameOrGroup(obj.categories);
        console.log('Filter after categories: ');
        printResults(tmpFilterObj);
    }
    if (obj.rating !== undefined) {
        check++;
        tmpFilterObj = filter.filterForRestaurantWithRating(obj.rating);
        console.log('Filter after rating: ');
        printResults(tmpFilterObj);
    }
    if (obj.range !== undefined) {
        check++;
        console.log('range: ' + obj.range);
    }
    if (obj.location !== undefined) {
        check++;
        tmpFilterObj = filter.filterForRestaurantWithLocation(obj.location);
        console.log('Filter after location:');
        printResults(tmpFilterObj);
    }
}

function printResults(results: IRestaurantFrontEnd[]) {
    for (let result of results) {
        console.log(result);
    }
}

export function testFilter() {
    const commObjAll: ICommunicationObject = {
        name: 'all',
        allergenList: ['gluten', 'lactose'],
        categories: ['maindish'],
        location: 'Berlin',
        range: 0,
        rating: [4,5],
    }
    handleFilterRequest(commObjAll);
}