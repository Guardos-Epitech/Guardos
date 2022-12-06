import React from "react";
import styles from "./InputSearch.module.scss";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d071a",
    },
  },
});

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
      <ThemeProvider theme={theme}>
        <TextField
          label="Location"
          variant="outlined"
          className={styles.InputSearch}
        />
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <TextField
          label="Categories"
          variant="outlined"
          className={styles.InputSearch}
        />
      </ThemeProvider>
    </div>
  );
};

export default InputSearch;
