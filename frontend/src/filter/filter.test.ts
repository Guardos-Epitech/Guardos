import React from "react";
import Filter from "./filter";
import { render, fireEvent } from "@testing-library/react";


// to use test add return results; to the end of the functions
test("filterForRestaurantsWithAllergens", () => {
    const filter = new Filter();
    const results = filter.filterForRestaurantsWithAllergens(["milk", "cheese"]);
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
