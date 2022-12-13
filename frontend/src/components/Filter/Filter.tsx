import React, { useState } from "react";
import styles from "./Filter.module.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { NavigateTo } from "@src/utils/NavigateTo";
import { useNavigate } from "react-router-dom";

const GlobalStyle = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#AC2A37",
        contrastText: "#ffffff",
      },
    },
    components: {
      MuiChip: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#FFFFFF',
            color: "#000000",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "400",
          },
          colorSecondary: {
            backgroundColor: '#AC2A37',
            color: "#ffffff",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "400",
          },
        },
      },
    },  
  });
};

const marks = [
  {
    value: 0,
    label: '0 km',
  },
  {
    value: 100,
    label: '100 km',
  },
];

type color = "primary" | "secondary" | "default" | "error" | "info" | "success" | "warning"

const Filter = (prop : any) => {
  const [colorChip, setColorChip] = useState<color>("primary")
  const handleClick = () => {
    if (colorChip == "primary") setColorChip("secondary");
    if (colorChip == "secondary") setColorChip("primary");
  };

  const navigate = useNavigate();
  const [states, setStates] = React.useState([
    { name: "oneStar", value: true },
    { name: "twoStar", value: true },
    { name: "threeStar", value: true },
    { name: "fourStar", value: true },
    { name: "fiveStar", value: true },
    { name: "Burger", value: true },
    { name: "Pizza", value: true },
    { name: "Salade", value: true },
    { name: "Sushi", value: true },
    { name: "Pasta", value: true }
  ]);

  function onChangeStates(toChange : String) {
    let statesCopy = [...states];
    states.map((state, index) => {
      if (toChange === state.name) {
        statesCopy[index].value = !statesCopy[index].value;
      }
    });
    console.log(states);
    setStates(statesCopy);
    console.log(states);
    prop.onChange(states);
    console.log(states);
  }

  function onChangeRange(event : any) {
    prop.onRangeChange(event.target.value);
  }

  return (
    <div className={styles.RectFilter}>
      <div className={styles.DivFilter}>
        <div className={styles.DivTitleFilter}>
          <span className={styles.TitleFilter}>Filter by:</span>
        </div>
        <div className={styles.DivRatingBox}>
          <span className={styles.TitleSubFilter}>Rating:</span>
          <div className={styles.DivRating}>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"5 stars"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("fiveStar")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"4 stars"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("fourStar")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"3 stars"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("threeStar")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"2 stars"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("twoStar")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"1 star"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("oneStar")}
              />
            </ThemeProvider>
          </div>
        </div>
        <div className={styles.DivRange}>
          <div>
            <span className={styles.TitleSubFilter}>Range:</span>
          </div>
          <div className={styles.DivSlider}>
            <ThemeProvider theme={GlobalStyle()}>
              <Box sx={{ width: "20rem" }}>
                <Slider defaultValue={100} color="primary" marks={marks} valueLabelDisplay="on" onChange={(event) => onChangeRange(event)}/>
              </Box>
            </ThemeProvider>
          </div>
        </div>
        <div className={styles.DivCategoriesBox}>
          <span className={styles.TitleSubFilter}>Categories:</span>
          <div className={styles.DivCategories}>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Burger"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("Burger")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Sushi"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("Sushi")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Pizza"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("Pizza")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Salade"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("Salade")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Pasta"}</span>}
                className={styles.test}
                onChange={event => onChangeStates("Pasta")}
              />
            </ThemeProvider>
          </div>
        </div>
        <div className={styles.DivAller}>
          <div className={styles.DivTitleAller}>
            <span className={styles.TitleSubFilter}>Allergens:</span>
          </div>
          <div>
            <Stack direction="row" spacing={1}>
              <ThemeProvider theme={GlobalStyle()}>
                <Chip label="Aller 1" color={colorChip} variant="outlined" onClick={handleClick} />
              </ThemeProvider>
              <ThemeProvider theme={GlobalStyle()}>
                <Chip label="Aller 2" color={colorChip} variant="outlined" onClick={handleClick} />
              </ThemeProvider>
              <ThemeProvider theme={GlobalStyle()}>
                <Chip label="Aller 3" color={colorChip} variant="outlined" onClick={handleClick} />
              </ThemeProvider>
              <ThemeProvider theme={GlobalStyle()}>
                <Chip label="Aller 4" color={colorChip} variant="outlined" onClick={handleClick} />
              </ThemeProvider>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
