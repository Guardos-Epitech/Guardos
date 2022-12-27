import React from "react";
import styles from "./RestoCard.module.scss";
import restoimg from "@src/assets/restoimg.jpeg";
import PlaceIcon from "@mui/icons-material/Place";
import { loremIpsum } from "lorem-ipsum";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ratingimg from "@src/assets/ratingimg.png";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "@src/utils/NavigateTo";

const PageBtn = () => {
  return createTheme({
    typography: {
      button: {
        fontFamily: "Montserrat",
        textTransform: "none",
        fontSize: "1.13rem",
        fontWeight: "500",
      },
    },
    palette: {
      primary: {
        main: "#AC2A37",
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

const RestoCard = (props : any) => {
  const navigate = useNavigate();
  const name = props.data.name;
  const streetName = props.data.location.streetName;
  const streetNumber = props.data.location.streetNumber;
  const city = props.data.location.city;
  const postalCode = props.data.location.postalCode;
  const description = props.data.description;

  function renderDynamicMenu(index: number) {
    return(
      props.onRender(index)
    );
  }

  return (
    <div className={styles.RectCard}>
      <img className={styles.RestoImg} src={restoimg} alt="Resto Img" />
      <div>
        <div className={styles.DivTopTitle}>
          <span className={styles.TitleResto}>{name}</span>
          <div className={styles.DivRating}>
            <span className={styles.TitleRating}>Rating:</span>
            <img
              className={styles.RatingImg}
              src={ratingimg}
              alt="Rating Img"
            />
          </div>
        </div>
        <div className={styles.DivAddress}>
          <PlaceIcon />
          <span>{streetName} {streetNumber}, {city} {postalCode}</span>
        </div>
        <div className={styles.DivDesc}>
          <p className={styles.TxtDescription}>{description}</p>
          <div className={styles.BtnPage}>
            <ThemeProvider theme={PageBtn()}>
              <Button
                variant="contained"
                sx={{ width: "12.13rem" }}
                onClick={() => NavigateTo("/menu", navigate, renderDynamicMenu(props.index))}
              >
                Restaurant page
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestoCard;
