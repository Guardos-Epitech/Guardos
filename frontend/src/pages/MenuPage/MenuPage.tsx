import React from "react";
import { useLocation } from "react-router-dom";
import styles from "@src/pages/MenuPage/MenuPage.module.scss";
import Dish from "@src/components/menu/Dish/Dish";
import Category from "@src/components/menu/Category/Category";
import Layout from "@src/components/Layout/Layout";
import Header from "@src/components/Header/Header";
import burgerImg from "@src/assets/dishImages/burger.jpg";
import PlaceIcon from "@mui/icons-material/Place";
import {List, ListItem} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FAFAFA",
        },
    },
});

const MenuPage = () => {
    const location = useLocation();
    const name = location.state.name;
    const streetName = location.state.location.streetName;
    const streetNumber = location.state.location.streetNumber;
    const city = location.state.location.city;
    const postalCode = location.state.location.postalCode;
    return (
        <>
            <Header/>
            <div className={styles.RectOnImg}>
                <List>
                    <ListItem>
                        <h2 className={styles.RestaurantTitle}>{name}</h2>
                    </ListItem>
                    <ListItem>
                        <div className={styles.Address}>
                            <ThemeProvider theme={theme}>
                                <PlaceIcon color={"primary"}/>
                            </ThemeProvider>
                            <span className={styles.RestaurantAddress}>{streetName} {streetNumber}, {city} {postalCode}</span>
                        </div>
                    </ListItem>
                </List>
            </div>
            <Layout>
                <Category title={"Appetizers"}>
                    {location.state.dishes.map((item : any, index: number) => {
                        if (item.category.menuGroup === "appetizer") {
                            return <Dish dishName={item.name} dishAllergens={item.allergens} dishDescription={item.description}
                            imageSrc={burgerImg} price={item.price} key={index}/> 
                        }
                    })}
                </Category>
                <Category title={"Main Courses"}>
                    {location.state.dishes.map((item : any, index: number) => {
                        if (item.category.menuGroup === "maindish") {
                            return <Dish dishName={item.name} dishAllergens={item.allergens} dishDescription={item.description}
                            imageSrc={burgerImg} price={item.price} key={index}/> 
                        }
                    })}
                </Category>
                <Category title={"Dessert"}>
                    {location.state.dishes.map((item : any, index: number) => {
                        if (item.category.menuGroup === "dessert") {
                            return <Dish dishName={item.name} dishAllergens={item.allergens} dishDescription={item.description}
                            imageSrc={burgerImg} price={item.price} key={index}/> 
                        }
                    })}
                </Category>
            </Layout>
        </>
    );
};

export default MenuPage;
