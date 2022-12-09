import React from "react";
import Filter from "../../filter/filter";

const myFilter = new Filter();

const FilterPage = () => {
    return (
        <div className="test">
            <span>
                FilterPage
            </span>
            <br></br>
        <button onClick={() =>{myFilter.filterForRestaurantsWithAllergens(["Cheese", "milk"])}}>
            Filter for allergens test
        </button>
            <br></br>
            <button onClick={() =>{myFilter.filterForRestaurantWithNameOrGroup(["ice, burger"])}}>
                Filter for names test
            </button>
        </div>

    );
};

export default FilterPage;
