import React from "react";
import styles from "./RestoCard.module.scss";
import restoimg from "@src/asset/restoimg.jpeg";
import PlaceIcon from "@mui/icons-material/Place";
import { loremIpsum } from "lorem-ipsum";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ratingimg from "@src/asset/ratingimg.png";
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

const RestoCard = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.RectCard}>
      <img className={styles.RestoImg} src={restoimg} alt="Resto Img" />
      <div>
        <div className={styles.DivTopTitle}>
          <span className={styles.TitleResto}>Bar & Restaurant Wartesaal</span>
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
          <span>Zinnowitzer Straße 5, Berlin 10115</span>
        </div>
        <div className={styles.DivDesc}>
          <p className={styles.TxtDescription}>{loremIpsum({ count: 6 })}</p>
          <div className={styles.BtnPage}>
            <ThemeProvider theme={PageBtn()}>
              <Button
                variant="contained"
                sx={{ width: "12.13rem" }}
                onClick={() => NavigateTo("/menu", navigate)}
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
