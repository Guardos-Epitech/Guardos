import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Point } from 'ol/geom';
import { useGeographic } from 'ol/proj';
import "ol/ol.css";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { Vector as VL } from "ol/layer";
import { Style, Circle as CircleStyle, Stroke, Fill, Icon } from "ol/style";
import markerIcon from "../../assets/marker.png";

import {handleFilterRequest, IRestaurantFrontEnd, IFilterObject} from "@src/filter/filter";

import dummyDataRestaurant from "../../filter/restaurants.json";
import VectorLayer from "ol/layer/Vector";

import styles from "./Map.module.scss";

const Berlin = [13.409523443447888, 52.52111129522459];
const Epitech = [13.328820, 52.508540];// long,lat

interface IMapLoc {
    name: string;
    lat: number;
    long: number;
    street: string;
    streetNumber: string;
    postal: string;
}

interface MapProps {
    data: IRestaurantFrontEnd[]
}

const MapView = (props : MapProps) => {

    const layer = new TileLayer({
        source: new OSM(),
    });

    const view = new View({
        center: Berlin,
        zoom: 15,
    });

    const map = new Map({ 
        view: view,
        layers: [layer],
        target: styles.map
    });

    let markerList: Feature[] = [];
    markerList.pop();

    for (const elem of props.data) {
        const obj = new Feature({
            type: 'icon',
            geometry: new Point([elem.location.longitude, elem.location.latitude]),
            description: elem.name,
            address: elem.location.streetName + ' ' + elem.location.streetNumber + ' ' + elem.location.postalCode,
        });
        markerList.push(obj);
    };

    const stylesMarker = {
        'geoMarker': new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({color: 'red'}),
            stroke: new Stroke({
              color: 'white',
              width: 2,
            }),
          }),
        }),
        'icon': new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: markerIcon,
            scale: 0.05,
          }),
        }),
    };

    const vectorLayer = new VL({
        source: new VectorSource({
          // features: [epitechMarker],
          features: markerList,
        }),
        style: function (feature) {
          return stylesMarker['icon'];
        },
    });

    map.addLayer(vectorLayer);
    
    return (
      <>
        <div className={styles.map} id='map'/>
      </>
    )
};

export default MapView;