import React from "react";
import {Grid} from "@mui/material";

import styles from "@src/components/menu/Dish/WithPicture/DishWithPicture.module.scss";

import AllergenTags from "@src/components/menu/AllergenTags/AllergenTags";
import DishHeader from "@src/components/menu/Dish/DishHeader/DishHeader";

interface IDishWithPictureProps {
    dishName: string,
    dishAllergens: string[],
    dishDescription: string,
    shortenedDescription: string,
    imageSrc: string,
    price: number,
    extended: boolean
}

const DishWithPicture = (props: IDishWithPictureProps) => {
    const {dishName, dishAllergens, dishDescription, shortenedDescription, imageSrc, price, extended} = props;

    return (
        <>
            {/*mobile version of dish element*/}
            <div className={styles.MobileVersion}>
                <Grid container justifyContent={"space-between"}>

                    <Grid item className={styles.GridItem}>
                        <h3>
                            {dishName}
                        </h3>
                        <h3>
                            {`${price.toFixed(2)} €`}
                        </h3>
                    </Grid>
                    <Grid item className={styles.ImageParent}>
                        <img src={imageSrc} className={styles.ImageDimensions} alt={dishName} />
                    </Grid>
                    <Grid xs={12} className={styles.GridItemDescription}>
                        <p className={styles.JustificationPrint}>
                            {extended ? dishDescription : shortenedDescription}
                        </p>
                        {extended && <AllergenTags dishAllergens={dishAllergens}/>}
                    </Grid>

                </Grid>
            </div>


            {/*web version of dish element*/}
            <div className={styles.WebVersion}>
                <Grid container>

                    <Grid item xs={9}  className={styles.GridItem}>
                        <DishHeader dishName={dishName} price={price}/>
                        <p className={styles.JustificationPrint}>
                            {extended ? dishDescription : shortenedDescription}
                        </p>
                    </Grid>

                    <Grid item xs={3} className={styles.GridItemImage}>
                        {imageSrc && <img src={imageSrc} alt={dishName} className={styles.ImageDimensions}/>}
                        {extended && <AllergenTags dishAllergens={dishAllergens}/>}
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default DishWithPicture;