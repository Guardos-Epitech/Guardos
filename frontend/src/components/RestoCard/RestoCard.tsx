import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PlaceIcon from "@mui/icons-material/Place";
import Button from "@mui/material/Button";
import { Grid, Paper } from "@mui/material";
import styles from "./RestoCard.module.scss";

import { IRestaurantFrontEnd } from "@src/filter/filter";
import Rating from "@src/components/RestoCard/Rating/Rating";
import placeholderImg from "@src/assets/placeholder.png";
import { NavigateTo } from "@src/utils/NavigateTo";

const PageBtn = () => {
  return createTheme({
    typography: {
      button: {
        fontFamily: "Montserrat",
        textTransform: "none",
        fontSize: "1.13rem",
        fontWeight: "500",
        padding: "0"
      },
    },
    palette: {
      primary: {
        main: "#6d071a",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#094067",
        contrastText: "#ffffff",
      },
    },
    shape: {
      borderRadius: 5,
    },
  });
};

interface IRestoCardProps {
  resto: IRestaurantFrontEnd,
  dataIndex: number,
  key: number,
}

const RestoCard = (props: IRestoCardProps) => {
  const navigate = useNavigate();
  const [extended, setExtended] = useState(false);
  const { name, rating, description, categories, ratingCount } = props.resto;
  const { streetName, streetNumber, postalCode, city, country } = props.resto.location;
  const address = `${streetName} ${streetNumber}, ${postalCode} ${city}, ${country}`;
  const imageSrc = props.resto.pictures[0] && props.resto.pictures[0].length != 0 ? props.resto.pictures[0] : placeholderImg;

  const handleClick = () => {
    setExtended((prevState) => !prevState);
  }

  return (
    <Paper className={styles.DishBox} elevation={3} onClick={handleClick}>
      <Grid container>
        <Grid item xs={3} className={styles.GridItemImage}>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={name}
              className={styles.ImageDimensions}
            />
          )}
        </Grid>

        <Grid item xs={9} className={styles.GridItem}>
          <div className={styles.FlexParent}>
            <h3 className={styles.DishTitle}>{name}</h3>
            <Rating restoRating={rating} restoRatingsCount={ratingCount} />
          </div>
          <div className={styles.FlexParent}>
            <PlaceIcon />
            <span className={styles.AddressText}>{address}</span>
          </div>
          <p
            className={
              extended
                ? styles.JustificationPrintExtended
                : styles.JustificationPrint
            }
          >
            {description}
          </p>
          <div className={styles.BtnPage}>
            <ThemeProvider theme={PageBtn()}>
              <Button
                className={styles.RestoBtn}
                variant="contained"
                onClick={() => NavigateTo("/menu", navigate, {
                  menu: categories,
                  restoName: name,
                  address: address,
                })}
              >
                Menu
              </Button>
            </ThemeProvider>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RestoCard;
