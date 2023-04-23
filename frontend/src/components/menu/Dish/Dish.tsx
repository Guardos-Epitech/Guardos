import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";

import styles from "@src/components/menu/Dish/Dish.module.scss";
import AllergenTags from "@src/components/menu/AllergenTags/AllergenTags";
import placeholderImg from "@src/assets/placeholder.png";

interface IDishProps {
  dishName: string;
  dishAllergens: string[];
  dishDescription: string;
  options?: string;
  imageSrc: string;
  price: number;
}

const Dish = (props: IDishProps) => {
  const [extended, setExtended] = useState(false);
  const { dishName, dishAllergens, dishDescription, options, price } = props;
  const imageSrc =
    props.imageSrc?.length > 0
      ? props.imageSrc
      : placeholderImg;
  const priceStr = `${price.toFixed(2)} €`;

  return (
    <Paper
      className={styles.DishBox}
      elevation={3}
      onClick={() => setExtended(!extended)}
    >
      {/*mobile version of dish element*/}
      <div className={styles.MobileVersion}>
        <Grid container justifyContent={"space-between"}>
          <Grid
            item
            className={extended ? styles.GridItem : styles.FlexGridItem}
          >
            <div className={styles.FlexParent}>
              <h3 className={styles.DishTitle}>{dishName}</h3>
            </div>
            {extended && <AllergenTags dishAllergens={dishAllergens} />}
          </Grid>
          <Grid item className={styles.FlexParent}>
            <img
              src={imageSrc}
              className={styles.ImageDimensions}
              alt={dishName}
            />
          </Grid>
          <Grid item xs={12} className={styles.GridItemDescription}>
            <p
              className={
                extended
                  ? styles.JustificationPrintExtended
                  : styles.JustificationPrint
              }
            >
              {dishDescription}
            </p>
            <span className={styles.OptionsText}>
              {options && options.length != 0 && (
                <div className={!extended && styles.OptionsWrap}>
                  <b>{"Options: "}</b>
                  {options}
                </div>
              )}
            </span>
            <h3>{priceStr}</h3>
          </Grid>
        </Grid>
      </div>

      {/*web version of dish element*/}
      <div className={styles.WebVersion}>
        <Grid container>
          <Grid item xs={10} className={styles.GridItem}>
            <div className={styles.FlexParent}>
              <h3 className={styles.DishTitle}>{dishName}</h3>
            </div>
            {/*TODO: change allergens to products list*/}
            {extended && <AllergenTags dishAllergens={dishAllergens} />}
            <p
              className={
                extended
                  ? styles.JustificationPrintExtended
                  : styles.JustificationPrint
              }
            >
              {dishDescription}
            </p>
            <span className={styles.OptionsText}>
              {options && options.length !== 0 && (
                <div className={!extended && styles.OptionsWrap}>
                  <b>Options: </b>
                  {options}
                </div>
              )}
            </span>
            <h3 className={styles.DishPrice}>{priceStr}</h3>
          </Grid>

          <Grid item xs={2} className={styles.GridItemImage}>
            {imageSrc && (
              <img
                src={imageSrc}
                alt={dishName}
                className={styles.ImageDimensions}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default Dish;
