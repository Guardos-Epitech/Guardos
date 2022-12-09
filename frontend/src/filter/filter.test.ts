import Filter, {IRestaurantBackEnd, IRestaurantFrontEnd} from "./filter";


// to use test add return results; to the end of the functions
test("filterForRestaurantsWithAllergensCase2AllergensIn1Dish", () => {
    const filter = new Filter();
    const results = filter.filterForRestaurantsWithAllergens(["salad", "cheese"]);
    for (const res in results) {
        if (res === "0") {
            expect(results[res].hitRate).toEqual(100);
        } else {
            expect(results[res].hitRate).toEqual(50);
        }
    }
});

test("filterForRestaurantsWithAllergensCase3AllergensIn2Dishes", () => {
    const filter = new Filter();
    const results = filter.filterForRestaurantsWithAllergens(["milk", "cheese", "salad"]);
    for (const res in results) {
        if (res === "0") {
            expect(results[res].hitRate).toEqual(100);
        } else {
            expect(results[res].hitRate).toEqual(0);
        }
    }
});

test("filterForRestaurantWithNameOrGroupCase1Name", () => {
    const filter = new Filter();
    const results = filter.filterForRestaurantWithNameOrGroup(["burgerme"]);
    for (const res in results) {
        if (res === "0") {
            expect(results[res].hitRate).toEqual(100);
        } else {
            expect(results[res].hitRate).toEqual(0);
        }
    }
});


function getCheck(original: IRestaurantBackEnd[], result: IRestaurantFrontEnd[]) {
    let check = 0;
    for (let org in original) {
        for (let filtered in result) {
            if (result[filtered].id === original[org].id) {
                for (let num in original[org].mealType) {
                    if (original[org].mealType[num].name === result[filtered].categories[num].name) {
                        check++;
                    }
                }
            }
        }
    }
    return check;
}

function getExpectedRes(original: IRestaurantBackEnd[], expectedRes: number) {
    for (let org in original) {
        for (let num in original[org].mealType) {
            expectedRes++;
        }
    }
    return expectedRes;
}

test("checkIfDishesAreFilteredRightForAllergenSearch", () => {
    const filter = new Filter();
    let original = filter.restaurants;
    const result = filter.filterForRestaurantsWithAllergens(["milk"]);
    let check = getCheck(original, result);
    let expectedRes = getExpectedRes(original, 0);
    expect(check).toBe(expectedRes);
});

test("checkIfDishesAreSortedRightForRestaurantOrGroupSearch", () => {
    const filter = new Filter();
    let original = filter.restaurants;
    const result = filter.filterForRestaurantWithNameOrGroup(["ice"]);
    let check = getCheck(original, result);
    let expectedRes = getExpectedRes(original, 0);
    expect(check).toBe(expectedRes);
});