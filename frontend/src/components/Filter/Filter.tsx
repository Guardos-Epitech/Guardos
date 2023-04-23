import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { IFilterObject } from "@src/filter/filter";
import styles from "./Filter.module.scss";

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
            "&&:hover": {
              backgroundColor: '#C46973'
            }
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

interface allergen {
  name: string;
  value: boolean;
  colorButton: color;
}

interface FilterProps {
  onChange: Function,
  onRangeChange: Function
}

const Filter = (props: FilterProps) => {
  const [states, setStates] = React.useState([
    { name: "oneStar", value: true },
    { name: "twoStar", value: true },
    { name: "threeStar", value: true },
    { name: "fourStar", value: true },
    { name: "fiveStar", value: true },
    { name: "Burger", value: true },
    { name: "Pizza", value: true },
    { name: "Salad", value: true },
    { name: "Sushi", value: true },
    { name: "Pasta", value: true }
  ]);

  const [allergens, setAllergens] = React.useState<allergen[]>([
    { name: "milk", value: false, colorButton: "primary" },
    { name: "peanut", value: false, colorButton: "primary" },
    { name: "shellfish", value: false, colorButton: "primary" },
    { name: "eggs", value: false, colorButton: "primary" }
  ]);

  const handleClick = (name: string) => {
    const allergensCopy = [...allergens];
    const allergenListChanged = [];

    allergens.map((state, index) => {
      if (name === state.name) {
        allergensCopy[index].value = !allergensCopy[index].value;
        if (allergensCopy[index].colorButton == "primary") {
          allergensCopy[index].colorButton = "secondary";
        } else {
          allergensCopy[index].colorButton = "primary";
        }
      }
    });
    setAllergens(allergensCopy);

    for (let i = 0; i < allergensCopy.length; i++) {
      if (allergensCopy[i].value) {
        allergenListChanged.push(allergensCopy[i].name);
      }
    }
    const inter: IFilterObject = {
      allergenList: allergenListChanged
    }

    props.onChange(inter, allergensCopy);
  };

  function onChangeStates(toChange: string) {
    const statesCopy = [...states];
    const categoriesSelected = [];
    let min = 0;
    let max = 0;

    states.map((state, index) => {
      if (toChange === state.name) {
        statesCopy[index].value = !statesCopy[index].value;
      }
    });

    setStates(statesCopy);

    for (let i = 0; i < 5; i++) {
      if (states[i].value == true) {
        if (min == 0 && max == 0) {
          min = i + 1;
          max = i + 1;
        } else if (max < i + 1) {
          max = i + 1;
        }
      }
    }
    for (let i = 5; i < statesCopy.length; i++) {
      if (statesCopy[i].value == true) {
        categoriesSelected.push(statesCopy[i].name);
      }
    }
    const inter: IFilterObject = {
      rating: [min, max],
      categories: categoriesSelected
    }

    props.onChange(inter, states);
  }

  function onChangeRange(event: any) {
    const inter: IFilterObject = {
      range: event.target.value
    }
    props.onRangeChange(inter);
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
                onChange={() => onChangeStates("fiveStar")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"4 stars"}</span>}
                onChange={() => onChangeStates("fourStar")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"3 stars"}</span>}
                onChange={() => onChangeStates("threeStar")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"2 stars"}</span>}
                onChange={() => onChangeStates("twoStar")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"1 star"}</span>}
                onChange={() => onChangeStates("oneStar")}
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
                <Slider
                  defaultValue={100}
                  color="primary"
                  marks={marks}
                  valueLabelDisplay="on"
                  onChange={(event) => onChangeRange(event)}
                />
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
                onChange={() => onChangeStates("Burger")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Sushi"}</span>}
                onChange={() => onChangeStates("Sushi")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Pizza"}</span>}
                onChange={() => onChangeStates("Pizza")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Salad"}</span>}
                onChange={() => onChangeStates("Salad")}
              />
            </ThemeProvider>
            <ThemeProvider theme={GlobalStyle()}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className={styles.TitleCheck}>{"Pasta"}</span>}
                onChange={() => onChangeStates("Pasta")}
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
              {allergens.map((allergen) => {
                return (
                  <ThemeProvider theme={GlobalStyle()}>
                    <Chip
                      label={allergen.name}
                      color={allergen.colorButton}
                      variant="outlined"
                      onClick={() => handleClick(allergen.name)}
                    />
                  </ThemeProvider>
                );
              })}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
