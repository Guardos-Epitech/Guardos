import React from "react";
import Button from "@mui/material/Button";
import { NavigateTo } from "../../utils/NavigateTo";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  let navigate = useNavigate();
  return (
    <div className={styles.test}>
      <span>Home Page</span>
      <Button variant="contained" onClick={() => NavigateTo("/", navigate)}>
        Home Page
      </Button>
      <Button
        variant="contained"
        onClick={() => NavigateTo("/filter", navigate)}
      >
        Filter Page
      </Button>
      <Button variant="contained" onClick={() => NavigateTo("/menu", navigate)}>
        Menu Page
      </Button>
      {/* search bar
            filter button */}
    </div>
  );
};

export default HomePage;
