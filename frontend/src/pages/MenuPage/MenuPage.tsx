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
import { useLocation } from "react-router-dom";

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
    const location = useLocation();

    return (
        <>
            <Header/>
            <div className={styles.RectOnImg}>
                <List>
                    <ListItem>
                        <h2 className={styles.RestaurantTitle}>{location.state.name}</h2>
                    </ListItem>
                    <ListItem>
                        <div className={styles.Address}>
                            <ThemeProvider theme={theme}>
                                <PlaceIcon color={"primary"}/>
                            </ThemeProvider>
                            <span className={styles.RestaurantAddress}>{location.state.location.streetName} {location.state.location.streetNumber}, {location.state.location.city} {location.state.location.postalCode}</span>
                        </div>
                    </ListItem>
                </List>
            </div>
            <Layout>
                <Category title={"Appetizers"}>
                    {location.state.dishes.map((item : any, index: number) => {
                        if (item.category.menuGroup === "appetizer") {
                            return <Dish dishName={item.name} dishAllergens={item.allergens} dishDescription={item.description}
                            imageSrc={burgerImg} price={item.price}/> 
                        }
                    })}
                </Category>
                <Category title={"Main Courses"}>
                    {location.state.dishes.map((item : any, index: number) => {
                        if (item.category.menuGroup === "maindish") {
                            return <Dish dishName={item.name} dishAllergens={item.allergens} dishDescription={item.description}
                            imageSrc={burgerImg} price={item.price}/> 
                        }
                    })}
                </Category>
                <Category title={"Dessert"}>
                    {location.state.dishes.map((item : any, index: number) => {
                        if (item.category.menuGroup === "desert") {
                            return <Dish dishName={item.name} dishAllergens={item.allergens} dishDescription={item.description}
                            imageSrc={burgerImg} price={item.price}/> 
                        }
                    })}
                </Category>
            </Layout>
        </>
    );
};

export default MenuPage;
