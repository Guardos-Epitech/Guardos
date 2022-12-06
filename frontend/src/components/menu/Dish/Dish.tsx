import React, {useState} from "react";
import {Grid, Paper} from "@mui/material";

import styles from "@src/components/menu/Dish/Dish.module.scss";

import AllergenTags from "@src/components/menu/AllergenTags/AllergenTags";
import DishHeader from "@src/components/menu/Dish/DishHeader/DishHeader";

const Dish = () => {
    const [extended, setExtended] = useState(false);
    const dishName = "Some title";
    const dishAllergens: string[] = ["Gluten", "Lactose", "Nuts", "Lactose", "Nuts"];
    const dishDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
        "Why do we use it?\n";
    const shortenedDescription = dishDescription.substring(0, 250);
    const price = 10.00;

    return (
        <Paper className={styles.dishBox} elevation={3} sx={{ m: 2 }} onClick={() => setExtended(!extended)}>
            <Grid container>

                <Grid item xs={9}  className={styles.gridItemUpper}>
                    <DishHeader dishName={dishName} price={price}/>
                </Grid>

                <Grid item xs={3} className={styles.gridItemUpper}>
                </Grid>

                <Grid item xs={9}  className={styles.gridItemLower}>
                    <p className={styles.justificationPrint}>
                        {extended ? dishDescription : shortenedDescription}
                    </p>
                </Grid>

                <Grid item xs={3}  className={styles.gridItemLower}>
                    {extended && <AllergenTags dishAllergens={dishAllergens}/>}
                </Grid>

            </Grid>

        </Paper>
    )
}

export default Dish;