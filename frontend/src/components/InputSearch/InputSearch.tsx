import React from "react";
import styles from "./InputSearch.module.scss";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Autocomplete from "../../components/InputSearchAutocomplete/autoComplete";
import autoCompleteData from "../../components/InputSearchAutocomplete/filterDataLocation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d071a",
    },
  },
});

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

const InputSearch = () => {
  return (
    <div className={styles.DivSearchInput}>
      <ThemeProvider theme={theme}>
        <TextField
          label="Name"
          variant="outlined"
          className={styles.InputSearch}
        />
      </ThemeProvider>
      <Autocomplete data={autoCompleteData}/>
      <ThemeProvider theme={PageBtn()}>
        <Button variant="contained" endIcon={<SearchIcon />}>Search</Button>
      </ThemeProvider>
    </div>
  );
};

export default InputSearch;
