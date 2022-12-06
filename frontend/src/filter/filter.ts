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
    price: {minimum: number, maximum: number}
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



    filterForRestaurants(allergens: string[]) {

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
            let obj : IRestaurant = {
                name: '',
                id: 0,
                phonenumber: '',
                dishes: [{name: '', description: '', price: {minimum: 0, maximum: 0},
                    allergens: '', category: {'menu-group': '', 'food-group': ''}}],
                location: {streetname: '', streetnumber: '', postalcode: '', country: ''},
                hitrate: 0};
            obj.name = i.name;
            obj.id = i.id;
            obj.phonenumber = i["phone-number"];
            obj.dishes.pop();
            let x = 0;
            for (let j of i.dishes) {
                obj.dishes[x] = j;
                x++;
            }
            obj.location = i.location;
            obj.hitrate = (1 - (count / i.dishes.length))  * 100;
            results.restaurants.push(obj);
        }
        console.log(results);
    }

    // 1 == Filter
    // 2 == Restaurants
    tryFilter(word: string, what: Number) {
        let results: IFilter = {
            filter: [{name: '', values: [{name: ''}]},
                {
                name: '',
                values: [{name: '', identifier: ''}]
            }]
        };
        let count = 0;
        if (what === 1) {
            //check if name
            for (let i of this.filter.Filter) {
                if (i.name.toLowerCase().includes(word.toLowerCase())) {
                    results.filter[count].name = i.name;

                    // @ts-ignore
                    results.filter[count].values = i.values;
                }
                count++;
            }

            console.log(results);
        }
    }
    printall() {
        console.log(this.filter);
        console.log(this.restaurants);
    }
}