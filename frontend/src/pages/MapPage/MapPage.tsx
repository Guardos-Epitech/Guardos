import React, {useEffect, useRef, useState} from 'react';
import styles from "@src/pages/MapPage/MapPage.module.scss";
import Header from "@src/components/Header/Header";
import {List, ListItem} from "@mui/material";
import {createTheme} from "@mui/material/styles";

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
        <html>
            <header>
                <link rel="stylesheet" href="./style.css"></link>
                <script src="index.js"></script>
            </header>
            <body>
                {/* <Header/> */}
                {/* <div className={styles.RectOnImg}>
                    <List>
                        <ListItem>
                            <h2 className={styles.MapTitle}>{mapTitle}</h2>
                        </ListItem>
                    </List>
                </div> */}
                <div id="map"></div>
                <script
                    src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBGVZ1iBG-k9T8mNxYiQYRwkLSQndltmA4&callback=initMap&v=weekly'
                    defer
                    ></script>
            </body>
        </html>
       </>
    );
};

export default MapPage;