import React, {useState} from "react";
import {Grid, Paper} from "@mui/material";

import styles from "@src/components/menu/Dish/Dish.module.scss";

import AllergenTags from "@src/components/menu/AllergenTags/AllergenTags";
import DishHeader from "@src/components/menu/Dish/DishHeader/DishHeader";
import DishWithPicture from "@src/components/menu/Dish/DishWithPicture";

type DishProps = {
    dishName: string,
    dishAllergens: string[],
    dishDescription: string,
    imageSrc: string,
    price: number
}

const Dish = (props: DishProps) => {
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
                <Grid container>

                    {/*Dish name and price*/}
                    <Grid item xs={9} className={styles.gridItemUpper}>
                        <DishHeader dishName={dishName} price={price}/>
                    </Grid>

                    {/*Dish picture*/}
                    <Grid item xs={3} className={styles.gridItemUpper}>
                    </Grid>

                    {/*Dish description*/}
                    <Grid item xs={9} className={styles.gridItemLower}>
                        <p className={styles.justificationPrint}>
                            {extended ? dishDescription : shortenedDescription}
                        </p>
                    </Grid>

                    {/*Dish allergens*/}
                    <Grid item xs={3} className={styles.gridItemLower}>
                        {extended && <AllergenTags dishAllergens={dishAllergens}/>}
                    </Grid>

                </Grid>
            }

        </Paper>
    )
}

export default Dish;