import React from "react";

import styles from "@src/pages/MenuPage/MenuPage.module.scss";

import Dish from "@src/components/menu/Dish/Dish";
import Category from "@src/components/menu/Category/Category";
import Layout from "@src/components/Layout/Layout";
import Header from "@src/components/Header/Header";
import PlaceIcon from "@mui/icons-material/Place";
import {List, ListItem} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import burgerImg from "@src/assets/dishImages/burger.jpg";
import pizzaImg from "@src/assets/dishImages/pizza.jpg";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FAFAFA",
        },
    },
});

const MenuPage = () => {
    const restaurantName = "Restaurant Name";
    const restaurantAddress = "Zinnowitzer Straße 5, Berlin 10115";
    const dishName = "Juicy Burger";
    const dishAllergens: string[] = ["Gluten", "Lactose", "Nuts", "Sesame", "Tree nuts"];
    const dishDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
        "Why do we use it?\n";
    const price = 10.00;

    return (
        <>
            <Header/>
            <div className={styles.RectOnImg}>
                <List>
                    <ListItem>
                        <h2 className={styles.RestaurantTitle}>{restaurantName}</h2>
                    </ListItem>
                    <ListItem>
                        <div className={styles.Address}>
                            <ThemeProvider theme={theme}>
                                <PlaceIcon color={"primary"}/>
                            </ThemeProvider>
                            <span className={styles.RestaurantAddress}>{restaurantAddress}</span>
                        </div>
                    </ListItem>
                </List>
            </div>
            <Layout>
                <Category title={"Appetizers"}>
                    <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription}
                          imageSrc={burgerImg} price={price}/>
                    <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription}
                          imageSrc={""} price={price}/>
                </Category>
                <Category title={"Main Courses"}>
                    <Dish dishName={dishName} dishAllergens={dishAllergens}
                          dishDescription={dishDescription + dishDescription} imageSrc={pizzaImg} price={price}/>
                    <Dish dishName={dishName} dishAllergens={dishAllergens}
                          dishDescription={dishDescription + dishDescription} imageSrc={""} price={price}/>
                    <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription}
                          imageSrc={burgerImg} price={price}/>
                    <Dish dishName={dishName} dishAllergens={dishAllergens} dishDescription={dishDescription}
                          imageSrc={burgerImg} price={price}/>
                </Category>
            </Layout>
        </>
    );
};

export default MenuPage;
