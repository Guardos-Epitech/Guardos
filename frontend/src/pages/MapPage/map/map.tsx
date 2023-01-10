import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Point } from 'ol/geom';
import { useGeographic } from 'ol/proj';
import { VectorLayer } from "./layers";
import { TMapProps, IMapContext, TMapState } from "./map-types";
import "ol/ol.css";
import "./map.css";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { Vector as VL } from "ol/layer";
import { Style, Circle as CircleStyle, Stroke, Fill, Icon } from "ol/style";
import dummyDataRestaurant from "../../../filter/restaurants.json";
import markerIcon from "../../../assets/marker.png";
import Geolocation from 'ol/Geolocation.js';
import {handleFilterRequest, IRestaurantFrontEnd, IFilterObject} from "@src/filter/filter";

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

useGeographic();

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: TMapState = {};
  restaurants: IMapLoc[];

  constructor(props: TMapProps, retsau: IRestaurantFrontEnd[]) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
    // this.restaurants = this.getAllRestaurantsLocation()
    this.restaurants = this.getAllRestaurantsLocation(retsau);
  }

  private getAllRestaurantsLocation(restauList: IRestaurantFrontEnd[]): IMapLoc[] {
    const result : IMapLoc[] = [];
    result.pop();
    // for (const elem of dummyDataRestaurant.restaurants) {
    for (const elem of dummyDataRestaurant.restaurants) {
      const obj: IMapLoc = {name: elem.name, lat: elem.location.latitude,
        long: elem.location.longitude, street: elem.location.streetName,
        streetNumber: elem.location.streetNumber,
        postal: elem.location.postalCode};
      result.push(obj);
    }
    return result;
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    const layer = new TileLayer({
      source: new OSM(),
    });

    const view = new View({
      center: Berlin,
      zoom: 15,
    });

    const map = new Map({
      target: this.mapDivRef.current,
      view: view,
      layers: [layer],
    });

    let markerList: Feature[] = [];
    for (const elem of this.restaurants) {
      const obj = new Feature({
        type: 'icon',
        geometry: new Point([elem.long, elem.lat]),
        description: elem.name,
        address: elem.street + ' ' + elem.streetNumber + ' ' + elem.postal,
      });
      markerList.push(obj);
    }
    console.log(markerList);
    const epitechMarker = new Feature({
      type: 'geoMarker',
      geometry: new Point(Epitech),
    });

    const styles = {
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
        return styles['icon'];
      },
    });

    map.addLayer(vectorLayer);

    const mapContext: IMapContext = { map };
    this.setState({
      mapContext: mapContext,
    });
  }

  render() {
    return (
      <>
        <div className="map" ref={this.mapDivRef}>
          <VectorLayer />
        </div>
      </>
    );
  }
}
