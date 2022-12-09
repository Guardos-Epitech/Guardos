import React from "react";
import styles from "./Header.module.scss";
import logo from "@src/assets/logo.png";

const Header = () => {
  return (
    <div className={styles.BackgroundRect}>
      <span className={styles.NavTitle}>Login</span>
      <span className={styles.NavTitle}>My Account</span>
      <img className={styles.LogoImg} src={logo} alt="Logo" />
      <span className={styles.NavTitle}>About Us ?</span>
      <span className={styles.NavTitle}>Contact Us</span>
    </div>
  );
};

export default Header;
