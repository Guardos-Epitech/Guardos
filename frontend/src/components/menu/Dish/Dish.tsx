import React, {useState} from "react";
import {Paper} from "@mui/material";

import styles from "@src/components/menu/Dish/Dish.module.scss";

import DishWithPicture from "@src/components/menu/Dish/WithPicture/DishWithPicture";
import DishWithoutPicture from "@src/components/menu/Dish/WithoutPicture/DishWithoutPicture";

interface IDishProps {
    dishName: string,
    dishAllergens: string[],
    dishDescription: string,
    imageSrc: string,
    price: number
}

const Dish = (props: IDishProps) => {
    const [extended, setExtended] = useState(false);
    const {dishName, dishAllergens, dishDescription, imageSrc, price } = props;
    const shortenedDescription = dishDescription.substring(0, 250);

    return (
        <Paper className={styles.dishBox} elevation={3} sx={{ m: 2 }} onClick={() => setExtended(!extended)}>
            {imageSrc ?
                <DishWithPicture
                    dishName={dishName}
                    dishAllergens={dishAllergens}
                    dishDescription={dishDescription}
                    shortenedDescription={shortenedDescription}
                    imageSrc={imageSrc}
                    price={price}
                    extended={extended}
                /> :
                <DishWithoutPicture
                    dishName={dishName}
                    dishAllergens={dishAllergens}
                    dishDescription={dishDescription}
                    shortenedDescription={shortenedDescription}
                    price={price}
                    extended={extended}
                />
            }

        </Paper>
    )
}

export default Dish;