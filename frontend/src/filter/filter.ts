import dummyDataFilter from './filterData.json';
import dummyDataRestaurants from './restaurants.json';


interface IAllergen {
    name: string;
    values: [{name: string}];
}

interface ICategories {
    name: string;
    dishes: [IDish];
}

interface IMealType {
    name: string;
    id: number;
    sortId: number;
}

interface ILocation {
    "streetname": string,
    "streetnumber": string,
    "postalcode": string,
    "country": string;
}
interface IDish {
    name: string;
    description: string;
    price: number;
    allergens: string; //maybe change this to array (also in json file)
    category: {"menu-group" : string, "food-group": string};
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
    phonenumber: string;
    dishes: [IDish];
    location: ILocation;
    mealtype: [IMealType];
    extra: [IDish];
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
                phonenumber: elem['phone-number'],
                dishes: [{} as IDish],
                location: elem.location,
                mealtype: [{} as IMealType],
                extra: [{} as IDish]
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
        console.log('BE:' ,result);
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
            phonenumber: i.phonenumber,
            categories: [{} as ICategories],
            location: i.location,
            hitrate: hitrate
        };
        obj.categories.pop();

        for (let x of i.mealtype) {
            let cate: ICategories = {
                name: x.name,
                dishes: [{} as IDish]
            }
            cate.dishes.pop();
            for (let dish of i.dishes) {
                if (dish.category["menu-group"] == x.name) {
                    cate.dishes.push(dish);
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
            //its now category and then dishes
            for (let dish of i.dishes) {
                for (let allergen of dish.allergens.split(',')) {
                   for (let x of allergens) {
                       if (allergen.toLowerCase().includes(x.toLowerCase())) {
                           count++;
                       }
                   }
                }
            }
            results.push(this.createRestaurantObj(i as unknown as IRestaurantBackEnd,
                (1 - (count / i.dishes.length)) * 100));

        }
        results.sort((a, b) => (a.hitrate < b.hitrate) ? 1 : -1);
        console.log(results);
        return results;
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
        console.log(results);
        return results;
    }
}