import React from "react";
import styles from "@src/components/InputSearch/InputSearch.module.scss";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Autocomplete from "@src/components/InputSearchAutocomplete/AutoComplete";
import autoCompleteData from "@src/components/InputSearchAutocomplete/filterDataLocation";
import { IFilterObject } from "@src/filter/filter";

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

const InputSearch = (props: any) => {
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");


  function onChangeName(event: any) {
    setName(event.target.value);
  }

  function onChangeLocation(event: any) {
    setLocation(event);
  }

  function sendButtonData(name: string, location: string) {
    const inter: IFilterObject = {
      name: name,
      location: location
    }
    props.onChange(inter);
  }

  return (
    <div className={styles.DivSearchInput}>
      <ThemeProvider theme={theme}>
        <TextField
          label="Name"
          variant="filled"
          className={styles.InputSearch}
          onChange={onChangeName}
        />
      </ThemeProvider>
      <Autocomplete data={autoCompleteData} onChange={onChangeLocation} />
      <ThemeProvider theme={PageBtn()}>
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={() => sendButtonData(name, location)} >
            Search
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default InputSearch;
