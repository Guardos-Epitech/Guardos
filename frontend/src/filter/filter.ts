import dummyDataFilter from './filterData.json';
import dummyDataRestaurants from './restaurants.json';


interface IAllergen {
    name: string;
    values: [{name: string}];
}

interface ICategories {
    name: string;
    values: [{name: string, identifier: string}];
}
interface IFilter {
    filter: [IAllergen, ICategories];
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
    price: string;
    allergens: string; //maybe change this to array (also in json file)
    category: {"menu-group" : string, "food-group": string};
}
interface IRestaurant {
    name: string;
    id: number;
    phonenumber: string;
    dishes: [IDish];
    location: ILocation;
    hitrate: number;
}

export default class Filter {
    filter;
    restaurants;

    constructor() {
        this.filter = dummyDataFilter;
        this.restaurants = dummyDataRestaurants;
    }

    getFilter() {
        return this.filter;
    }

    getRestaurants() {
        return this.restaurants;
    }

    private createRestaurantObj(i: IRestaurant, hitrate: number, phonenumber: string) {
        if (isNaN(hitrate))
            hitrate = 0;
        let obj: IRestaurant = {
            name: i.name,
            id: i.id,
            phonenumber: phonenumber,
            dishes: [{
                name: '', description: '', price: '',
                allergens: '', category: {'menu-group': '', 'food-group': ''}
            }],
            location: i.location,
            hitrate: hitrate
        };
        obj.dishes.pop();
        let x = 0;
        for (let j of i.dishes) {
            obj.dishes[x] = j;
            x++;
        }
        return obj;
    }



    filterForRestaurantsWithAllergens(allergens: string[]) {
        let results = {"restaurants": [{} as IRestaurant]};
        results.restaurants.pop();
        for (let i of this.restaurants.restaurants) {
            let count = 0;
            for (let dish of i.dishes) {
                for (let allergen of dish.allergens.split(',')) {
                   for (let x of allergens) {
                       if (allergen.toLowerCase().includes(x.toLowerCase())) {
                           count++;
                       }
                   }
                }
            }
            results.restaurants.push(this.createRestaurantObj(i as unknown as IRestaurant,
                (1 - (count / i.dishes.length)) * 100, i['phone-number']));

        }
        console.log(results);
    }

    filterForRestaurantwithNameorGroup(lookingfor: string[]) {
        let results = {"restaurants": [{} as IRestaurant]};
        results.restaurants.pop();
        for (let i of this.restaurants.restaurants) {
            let inserted = false;
            let countname = 0;
            let countgroup = 0;
            let hitratename = 0;
            let hitrategroup = 0;
            let max = 0;
            for (let x of lookingfor) {
                if (i.name.toLowerCase().includes(x.toLowerCase())) {
                    results.restaurants.push(this.createRestaurantObj(i as unknown as IRestaurant, 100,
                        i['phone-number']));
                    inserted = true;
                    break;
                }
                for (let j of i.dishes) {
                    if (j.name.toLowerCase().includes(x.toLowerCase())) {
                        countname++;
                        hitratename = (countname / i.dishes.length) * 100;

                    }
                    for (let y of j.category['food-group'].split(',')) {
                        if (y.toLowerCase().includes(x.toLowerCase())) {
                            max = j.category['food-group'].split(',').length;
                            countgroup++;
                            hitrategroup = (countgroup / max) * 100;

                        }
                    }
                }

            }
            if (!inserted) {
                results.restaurants.push(this.createRestaurantObj(i as unknown as IRestaurant, Math.max(hitratename, hitrategroup), i['phone-number']));
            }
        }
        console.log(results);
    }
}