import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavigateTo } from "@src/utils/NavigateTo";
import styles from "./Header.module.scss";
import logo from "@src/assets/logo.png";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [routeLoggedIn, setRouteLoggedIn] = useState('/login');
  const navigate = useNavigate();
  
  function logoutUser() {
    localStorage.removeItem('user');
    setLoggedIn(false);
    NavigateTo('/', navigate, {})
  }

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      localStorage.removeItem('user');
    }
  }, []);

  return (
    <div className={styles.BackgroundRect}>
      <span className={styles.NavTitle}>
        { loggedIn ? (
          <a onClick={logoutUser}>
            Logout
          </a>
        ) : (
          <a onClick={() => NavigateTo('/login', navigate, {})}>
            Login
          </a>
        )}
      </span>
      <span className={styles.NavTitle}>My Account</span>
      <img className={styles.LogoImg} src={logo} alt="Logo" onClick={() => NavigateTo('/', navigate, {})} />
      <span className={styles.NavTitle}>About Us ?</span>
      <span className={styles.NavTitle}>Contact Us</span>
    </div>
  );
};

export default Header;
