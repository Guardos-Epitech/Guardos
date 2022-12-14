import React from "react";
import styles from "./MapButton.module.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { NavigateTo } from "@src/utils/NavigateTo";
import { useNavigate } from "react-router-dom";

const MapBtn = () => {
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

const MapButton = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.DivRect}>
      <ThemeProvider theme={MapBtn()}>
        <Button variant="contained" sx={{ width: "15.44rem" }} onClick={() => NavigateTo("/map", navigate)}>
          Go To Map View
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default MapButton;
