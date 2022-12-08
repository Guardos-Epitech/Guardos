import React from "react";

import styles from "@src/pages/MenuPage/MenuPage.module.scss";

import Dish from "@src/components/menu/Dish/Dish";
import Category from "@src/components/menu/Category/Category";
import Layout from "@src/components/layout/Layout";

const MenuPage = () => {
    const dishName = "Juicy Burger";
    const dishAllergens: string[] = ["Gluten", "Lactose", "Nuts", "Sesame", "Tree nuts"];
    const dishDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
        "Why do we use it?\n";
    const price = 10.00;
    const imageSrc = "burger.jpg";
    const pizzaImageSrc = "pizza.jpg";

    return (
        <Layout>
            <h1 className={styles.menuTitle}>
                Menu Page
            </h1>
            <Category title={"Appetizers"}>
                <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription} imageSrc={imageSrc} price={price} />
                <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription} imageSrc={""} price={price} />
            </Category>
            <Category title={"Main Courses"}>
                <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription + dishDescription} imageSrc={pizzaImageSrc} price={price} />
                <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription + dishDescription} imageSrc={""} price={price} />
                <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription} imageSrc={imageSrc} price={price} />
                <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription} imageSrc={imageSrc} price={price} />
            </Category>
        </Layout>
    );
};

export default MenuPage;
