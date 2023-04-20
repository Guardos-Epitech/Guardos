import React from "react";
import { Chip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "@src/components/menu/AllergenTags/AllergenTags.module.scss";

const Tags = () => {
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
    },
    shape: {
      borderRadius: 5,
    },
  });
};

interface IAllergenTagsProps {
  dishAllergens: string[]
}

const AllergenTags = (props: IAllergenTagsProps) => {
  const { dishAllergens } = props;

  return (
    <ThemeProvider theme={Tags()}>
      {dishAllergens.length != 0 && dishAllergens.map((allergen) => (
        <Chip
          key={allergen}
          label={allergen}
          color="primary"
          variant="filled"
          size="small"
          className={styles.TagMargin}
        />
      ))}
    </ThemeProvider>
  )
}

export default AllergenTags;