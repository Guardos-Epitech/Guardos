import React from "react";
import {Grid} from "@mui/material";

import styles from "@src/components/menu/Dish/WithoutPicture/DishWithoutPicture.module.scss";

import AllergenTags from "@src/components/menu/AllergenTags/AllergenTags";
import DishHeader from "@src/components/menu/Dish/DishHeader/DishHeader";

interface IDishWithoutPictureProps {
    dishName: string,
    dishAllergens: string[],
    dishDescription: string,
    shortenedDescription: string,
    price: number,
    extended: boolean
}

const DishWithPicture = (props: IDishWithoutPictureProps) => {
    const {dishName, dishAllergens, dishDescription, shortenedDescription, price, extended} = props;

    return (
        <>
            {/*mobile version of dish element*/}
            <div className={styles.MobileVersion}>
                <Grid container>

                    {/*Dish name and price*/}
                    <Grid item xs={12} className={styles.GridItemUpper}>
                        <DishHeader dishName={dishName} price={price}/>
                    </Grid>

                    {/*Dish description*/}
                    <Grid item xs={12} className={styles.GridItemDescription}>
                        <p className={styles.JustificationPrint}>
                            {extended ? dishDescription : shortenedDescription}
                            {extended && <AllergenTags dishAllergens={dishAllergens}/>}
                        </p>
                    </Grid>

                </Grid>
            </div>

            {/*web version of dish element*/}
            <div className={styles.WebVersion}>
                <Grid container>

                    {/*Dish name and price*/}
                    <Grid item xs={9} className={styles.GridItemUpper}>
                        <DishHeader dishName={dishName} price={price}/>
                    </Grid>

                    {/*Dish picture*/}
                    <Grid item xs={3} className={styles.GridItemUpper}>
                    </Grid>

                    {/*Dish description*/}
                    <Grid item xs={9} className={styles.GridItemLower}>
                        <p className={styles.JustificationPrint}>
                            {extended ? dishDescription : shortenedDescription}
                        </p>
                    </Grid>

                    {/*Dish allergens*/}
                    <Grid item xs={3} className={styles.GridItemLower}>
                        {extended && <AllergenTags dishAllergens={dishAllergens}/>}
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default DishWithPicture;