import React from "react";
import styles from "./Filter.module.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const GlobalStyle = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#AC2A37",
        contrastText: "#ffffff",
      },
    },
  });
};

const Filter = () => {
  return (
    <div className={styles.RectFilter}>
      <div className={styles.DivFilter}>
        <div className={styles.DivTitleFilter}>
          <span className={styles.TitleFilter}>Filter by:</span>
        </div>
        <div className={styles.DivRating}>
          <span className={styles.TitleSubFilter}>Rating:</span>
          <ThemeProvider theme={GlobalStyle()}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<span className={styles.TitleCheck}>{"5 stars"}</span>}
              className={styles.test}
            />
          </ThemeProvider>
          <ThemeProvider theme={GlobalStyle()}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<span className={styles.TitleCheck}>{"4 stars"}</span>}
              className={styles.test}
            />
          </ThemeProvider>
          <ThemeProvider theme={GlobalStyle()}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<span className={styles.TitleCheck}>{"3 stars"}</span>}
              className={styles.test}
            />
          </ThemeProvider>
          <ThemeProvider theme={GlobalStyle()}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<span className={styles.TitleCheck}>{"2 stars"}</span>}
              className={styles.test}
            />
          </ThemeProvider>
          <ThemeProvider theme={GlobalStyle()}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<span className={styles.TitleCheck}>{"1 star"}</span>}
              className={styles.test}
            />
          </ThemeProvider>
        </div>
        <div className={styles.DivRange}>
          <div>
            <span className={styles.TitleSubFilter}>Range:</span>
            <span className={styles.TitleRangeValue}>30 km</span>
          </div>
          <div className={styles.DivSlider}>
            <ThemeProvider theme={GlobalStyle()}>
              <Box sx={{ width: "20rem" }}>
                <Slider defaultValue={30} color="primary" />
              </Box>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
