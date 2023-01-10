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
import { ICategories, IDishFE } from "@src/filter/filter";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FAFAFA",
    },
  },
});

const MenuPage = () => {
  const { menu, restoName, address } = useLocation().state;

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
        {menu.map((category: ICategories, index: number) => {
          return (
          <>
            {category.dishes.length > 0 && <Category key={category.name + index} title={category.name}>
              {category.dishes.map((dish: IDishFE, index: number) => {
                return (
                    <Dish
                        key={dish.name + index}
                        dishName={dish.name}
                        dishAllergens={dish.allergens.split(',')}
                        dishDescription={dish.description}
                        options={dish.category.extraGroup}
                        imageSrc={burgerImg}
                        price={dish.price}
                    />
              )})}
            </Category>}
          </>
        )})}
      </Layout>
    </>
  );
};

export default MenuPage;
