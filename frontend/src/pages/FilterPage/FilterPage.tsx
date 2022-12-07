import React from 'react';
import Filter from "../../filter/filter";

const MYFILTER = new Filter();

const FilterPage = () => {
    return (
        <div className='test'>
            <span>
                FilterPage
            </span>
            <br></br>
        <button onClick={() =>{MYFILTER.filterForRestaurantsWithAllergens(["Cheese", "milk"])}}>
            Filter for allergens test
        </button>
            <br></br>
            <button onClick={() =>{MYFILTER.filterForRestaurantwithNameorGroup(["ice"])}}>
                Filter for names test
            </button>
        </div>

    )
}

export default FilterPage;