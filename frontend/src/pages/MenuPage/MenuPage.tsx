import React from "react";

import styles from "@src/pages/MenuPage/MenuPage.module.scss";

import Dish from "@src/components/menu/Dish/Dish";
import Category from "@src/components/menu/Category/Category";
import Layout from "@src/components/layout/Layout";

const MenuPage = () => {
    return (
        <Layout>
            <h1 className={styles.menuTitle}>
                Menu Page
            </h1>
            <Category title={"Appetizers"}>
                <Dish />
                <Dish />
            </Category>
            <Category title={"Main Courses"}>
                <Dish />
                <Dish />
                <Dish />
                <Dish />
            </Category>
        </Layout>
    );
};

export default MenuPage;
