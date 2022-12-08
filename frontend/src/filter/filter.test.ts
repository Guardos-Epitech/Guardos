import React from "react";
import Filter from "./filter";
import { render, fireEvent } from "@testing-library/react";


// to use test add return results; to the end of the functions
test("filterForRestaurantsWithAllergens", () => {
    const filter = new Filter();
    const results = filter.filterForRestaurantsWithAllergens(["salat", "cheese"]);
    for (const res in results) {
        if (res === "0") {
            expect(results[res].hitrate).toEqual(100);
        } else {
            expect(results[res].hitrate).toEqual(50);
        }
    }
});

test("filterForRestaurantsWithAllergens", () => {
    const filter = new Filter();
    const results = filter.filterForRestaurantsWithAllergens(["milk", "cheese", "salat"]);
    for (const res in results) {
        if (res === "0") {
            expect(results[res].hitrate).toEqual(100);
        } else {
            expect(results[res].hitrate).toEqual(0);
        }
    }
});

test("filterForRestaurantwithNameorGroup", () => {
    const filter = new Filter();
    const results = filter.filterForRestaurantwithNameorGroup(["burgerme"]);
    for (const res in results) {
        if (res === "0") {
            expect(results[res].hitrate).toEqual(100);
        } else {
            expect(results[res].hitrate).toEqual(0);
        }
    }
});


test("checkIfDishesAreFilteredRightForAllergenSearch", () => {
    const filter = new Filter();
    let original = filter.restaurants;
    const result = filter.filterForRestaurantsWithAllergens(["milk"]);
    let check = 0;
    let expectedRes = 0;
    for (let org in original) {
        for (let filtered in result) {
            if (result[filtered].id == original[org].id) {
                for (let num in original[org].mealtype) {
                    if (original[org].mealtype[num].name == result[filtered].categories[num].name) {
                        check++;
                    }
                }
            }
        }
    }
    for (let org in original) {
        for (let num in original[org].mealtype) {
            expectedRes++;
        }
    }
    expect(check).toBe(expectedRes);
});

test("checkIfDishesAreSortedRightForRestaurantOrGroupSearch", () => {
    const filter = new Filter();
    let original = filter.restaurants;
    const result = filter.filterForRestaurantwithNameorGroup(["ice"]);
    let check = 0;
    let expectedRes = 0;
    for (let org in original) {
        for (let filtered in result) {
            if (result[filtered].id == original[org].id) {
                for (let num in original[org].mealtype) {
                    if (original[org].mealtype[num].name == result[filtered].categories[num].name) {
                        check++;
                    }
                }
            }
        }
    }
    for (let org in original) {
        for (let num in original[org].mealtype) {
            expectedRes++;
        }
    }
    expect(check).toBe(expectedRes);
});