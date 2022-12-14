import React from 'react';
import styles from "@src/pages/MapPage/MapPage.module.scss";
import Header from "@src/components/Header/Header";
import {List, ListItem} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { Map } from "./map";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FAFAFA",
        },
    },
});

const MapPage = () => {
    const mapTitle = "Search on map";
    return (
        <>
            <Header/>
            <div className={styles.RectOnImg}>
                <List>
                    <ListItem>
                        <h2 className={styles.MapTitle}>{mapTitle}</h2>
                    </ListItem>
                </List>
            </div>       
            <Map></Map>    
       </>
    );
};

export default MapPage;