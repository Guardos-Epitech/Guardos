import dummyDataFilter from './filterData.json';
import dummyDataRestaurants from './restaurants.json';

interface ICategories {
    name: string;
    hitrate: number;
    dishes: [IDishFE];
}

interface IMealType {
    name: string;
    id: number;
    sortId: number;
}

interface ICategoryBE {
    "menu-group" : string,
    "food-group": string,
    "extra-group": string
}

interface ICategoryFE {
    "food-group": string,
    "extra-group": string
}

interface ILocation {
    "streetname": string,
    "streetnumber": string,
    "postalcode": string,
    "country": string;
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
interface IRestaurantFrontEnd {
    name: string;
    id: number;
    phonenumber: string;
    categories: [ICategories];
    location: ILocation;
    hitrate: number;
}

interface IRestaurantBackEnd {
    name: string;
    id: number;
    'phone-number': string;
    dishes: [IDishBE];
    location: ILocation;
    mealtype: [IMealType];
    extra: [IDishBE];
}

export default class Filter {
    filter;
    restaurants;

    constructor() {
        this.filter = dummyDataFilter;
        this.restaurants = this.getAllRestaurantsofJSON();
    }

    getAllRestaurantsofJSON() {
        let result : IRestaurantBackEnd[] = [];
        result.pop();
        for (let elem of dummyDataRestaurants.restaurants) {
            let obj: IRestaurantBackEnd = {
                name: elem.name,
                id: elem.id,
                "phone-number": elem['phone-number'],
                dishes: [{} as IDishBE],
                location: elem.location,
                mealtype: [{} as IMealType],
                extra: [{} as IDishBE]
            }
            obj.dishes.pop();
            obj.mealtype.pop();
            obj.extra.pop();
            for (let x of elem.dishes) {
                obj.dishes.push(x);
            }
            for (let x of elem['meal-type']) {
                obj.mealtype.push(x);
            }
            for (let x of elem['extras']) {
                obj.extra.push(x);
            }
            result.push(obj);
        }
        for (let i of result) {
            i.mealtype.sort((a, b) => (a.sortId > b.sortId) ? 1 : -1);
        }
        return result;
    }
    getFilter() {
        return this.filter;
    }

    getRestaurants() {
        return this.restaurants;
    }

    private createRestaurantObj(i: IRestaurantBackEnd, hitrate: number) {
        if (isNaN(hitrate))
            hitrate = 0;
        let obj: IRestaurantFrontEnd = {
            name: i.name,
            id: i.id,
            phonenumber: i['phone-number'],
            categories: [{} as ICategories],
            location: i.location,
            hitrate: hitrate
        };
        obj.categories.pop();

        for (let x of i.mealtype) {
            let cate: ICategories = {
                name: x.name,
                hitrate: 0,
                dishes: [{} as IDishFE]
            }
            cate.dishes.pop();
            for (let dish of i.dishes) {
                if (dish.category["menu-group"] == x.name) {
                    let dishObj: IDishFE = {
                        name: dish.name,
                        description: dish.description,
                        price: dish.price,
                        allergens: dish.allergens,
                        category: {} as ICategoryFE,
                    }
                    dishObj.category["food-group"] = dish.category["food-group"];
                    dishObj.category["extra-group"] = dish.category["extra-group"];
                    cate.dishes.push(dishObj);
                }
            }
            obj.categories.push(cate);
        }
        return obj;
    }

    
    filterForRestaurantsWithAllergens(allergens: string[]) {
        let results = [{} as IRestaurantFrontEnd];
        
        results.pop();
        for (let i of this.restaurants) {
            let count = 0;
            for (let dish of i.dishes) {
                count = this.countHitRateAllergens(dish, allergens, count);
            }
            let obj = this.createRestaurantObj(i as unknown as IRestaurantBackEnd,
                (1 - (count / i.dishes.length)) * 100);
            for (let elem of obj.categories){
                for (let dish of elem.dishes) {
                    count = this.countHitRateAllergens(dish, allergens, count);
                }
                elem.hitrate = (1 - (count / elem.dishes.length)) * 100;
            }
            results.push(obj);
        }
        results.sort((a, b) => (a.hitrate < b.hitrate) ? 1 : -1);
        console.log(results);
        return results;
    }

    private countHitRateAllergens(dish: IDishFE, allergens: string[], count: number) {
        let hitcontrol = 0;
        for (let allergen of dish.allergens.split(',')) {
            for (let x of allergens) {
                if (allergen.toLowerCase().includes(x.toLowerCase())) {
                    count++;
                    hitcontrol++;
                }
            }
        }
        if (hitcontrol > 0) {
            count = count - (hitcontrol - 1);
        }
        return count;
    }

    filterForRestaurantwithNameorGroup(lookingfor: string[]) {
        let results =  [{} as IRestaurantFrontEnd];
        results.pop();
        for (let i of this.restaurants) {
            let inserted = false;
            let countname = 0;
            let countgroup = 0;
            let hitratename = 0;
            let hitrategroup = 0;
            let max = 0;
            for (let x of lookingfor) {
                if (i.name.toLowerCase().includes(x.toLowerCase())) {
                    results.push(this.createRestaurantObj(i as unknown as IRestaurantBackEnd, 100));
                    inserted = true;
                    break;
                }
                for (let j of i.dishes) {
                    let found = false;
                    if (j.name.toLowerCase().includes(x.toLowerCase())) {
                        countname++;
                        hitratename = (countname / i.dishes.length) * 100;
                        found = true;

                    }

                    for (let y of j.category['food-group'].split(',')) {
                        if (found)
                            break;
                        if (y.toLowerCase().includes(x.toLowerCase())) {
                            max = j.category['food-group'].split(',').length;
                            countgroup++;
                            hitrategroup = (countgroup / max) * 100;
                            found = true;
                        }
                    }
                }

            }
            if (!inserted) {
                results.push(this.createRestaurantObj(i as unknown as IRestaurantBackEnd, Math.max(hitratename, hitrategroup)));
            }
        }
        results.sort((a, b) => (a.hitrate < b.hitrate) ? 1 : -1);
        return results;
    }
}
