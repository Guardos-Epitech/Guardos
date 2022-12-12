import { useState } from "react";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./autoComplete.module.scss";
import inputSyles from "../InputSearch/InputSearch.module.scss"
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        main: "#6d071a",
      },
    },
  });

interface AutoCompleteProps {
    data: Array<String>;
}


const AutoComplete = (props : AutoCompleteProps) => {
    
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e :  any) => {
    const query = e.target.value
    console.log(query);
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = props.data.filter(
        (suggestion : any) =>
          suggestion.indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e : any) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e : any) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <ul className={styles.Suggestions + " " + inputSyles.InputSearch}>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <ThemeProvider theme={theme}>
        <div>
          <TextField
            label="Location"
            variant="outlined"
            className={inputSyles.InputSearch}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={value}
          />
          {suggestionsActive && <Suggestions />}
        </div>
    </ThemeProvider>
  );
  
};

export default AutoComplete;