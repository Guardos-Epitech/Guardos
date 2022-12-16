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

const RestoCard = (prop : any) => {
  const navigate = useNavigate();

  function renderDynamicMenu(index: number) {
    return(
      prop.onRender(index)
    );
  }

  return (
    <div className={styles.RectCard}>
      <img className={styles.RestoImg} src={restoimg} alt="Resto Img" />
      <div>
        <div className={styles.DivTopTitle}>
          <span className={styles.TitleResto}>{prop.data.name}</span>
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
          <span>{prop.data.location.streetName} {prop.data.location.streetNumber}, {prop.data.location.city} {prop.data.location.postalCode}</span>
        </div>
        <div className={styles.DivDesc}>
          <p className={styles.TxtDescription}>{prop.data.description}</p>
          <div className={styles.BtnPage}>
            <ThemeProvider theme={PageBtn()}>
              <Button
                variant="contained"
                sx={{ width: "12.13rem" }}
                onClick={() => NavigateTo("/menu", navigate, renderDynamicMenu(prop.index))}
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
