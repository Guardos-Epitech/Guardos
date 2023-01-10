import React from "react";
import { useLocation } from "react-router-dom";
import styles from "@src/pages/MenuPage/MenuPage.module.scss";
import Dish from "@src/components/menu/Dish/Dish";
import Category from "@src/components/menu/Category/Category";
import Layout from "@src/components/Layout/Layout";
import Header from "@src/components/Header/Header";
import burgerImg from "@src/assets/dishImages/burger.jpg";
import pizzaImg from "@src/assets/dishImages/dummyPizza.jpg";
import iceImg from "@src/assets/dishImages/dummyIcecream.jpg";
import saladImg from "@src/assets/dishImages/dummySalad.jpg";
import PlaceIcon from "@mui/icons-material/Place";
import { List, ListItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FAFAFA",
    },
  },
});

const MenuPage = () => {
  const { /*menu,*/ restoName, address, resto } = useLocation().state;

  return (
    <>
      <Header />
      <div className={styles.RectOnImg}>
        <List>
          <ListItem>
            <h2 className={styles.RestaurantTitle}>{restoName}</h2>
          </ListItem>
          <ListItem>
            <div className={styles.Address}>
              <ThemeProvider theme={theme}>
                <PlaceIcon color="primary" />
              </ThemeProvider>
              <span className={styles.RestaurantAddress}>{address}</span>
            </div>
          </ListItem>
        </List>
      </div>
      <Layout>
        <Category title="Appetizers">
          {resto.dishes.map((item: any, index: number) => {
            if (item.category.menuGroup === "appetizer") {
              return (
                <Dish
                  dishName={item.name}
                  dishAllergens={item.allergens.split(",")}
                  dishDescription={item.description}
                  options={""} // TODO: replace with real options
                  imageSrc={burgerImg}
                  price={item.price}
                  key={index}
                />
              );
            }
          })}
        </Category>
        <Category title="Main Courses">
          {resto.dishes.map((item: any, index: number) => {
            if (item.category.menuGroup === "maindish") {
              return (
                <Dish
                  dishName={item.name}
                  dishAllergens={item.allergens.split(",")}
                  dishDescription={item.description}
                  options="double cheese, double meat"
                  imageSrc={burgerImg}
                  price={item.price}
                  key={index}
                />
              );
            }
          })}
        </Category>
        <Category title="Dessert">
          {resto.dishes.map((item: any, index: number) => {
            if (item.category.menuGroup === "dessert") {
              return (
                <Dish
                  dishName={item.name}
                  dishAllergens={item.allergens.split(",")}
                  dishDescription={item.description}
                  options={""} // TODO: replace with real data
                  imageSrc={burgerImg}
                  price={item.price}
                  key={index}
                />
              );
            }
          })}
        </Category>
      </Layout>
    </>
  );
};

export default MenuPage;
