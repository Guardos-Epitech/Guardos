import React from "react";
import { Divider } from "@mui/material";

import styles from "@src/components/menu/Category/Category.module.scss";

interface ICategoryProps {
  title: string;
  children: React.ReactNode;
}

const Category = (props: ICategoryProps) => {
  return (
    <div className={styles.CategoryBox}>
      <Divider textAlign={"left"}>
        <h2>
          {props.title}
        </h2>
      </Divider>
      {props.children}
    </div>
  )
}

export default Category;