import React from "react";
import {Grid} from "@mui/material";

import styles from "@src/components/menu/Dish/DishHeader/DishHeader.module.scss";

interface IDishHeaderProps {
    dishName: string,
    price: number
}

const DishHeader = (props: IDishHeaderProps) => {
    const {dishName, price} = props;
    const priceStr = `${price.toFixed(2)} €`;

    return (
        <Grid container>
            <Grid item xs={6} className={styles.leftAligned}>
                <h3>
                    {dishName}
                </h3>
            </Grid>

            <Grid item xs={6} className={styles.rightAligned}>
                <h3 className={styles.rightAligned}>
                    {priceStr}
                </h3>
            </Grid>
        </Grid>
    )
}

export default DishHeader;