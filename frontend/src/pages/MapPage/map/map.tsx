import React, { useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import {Point} from 'ol/geom';
import {fromLonLat, useGeographic} from 'ol/proj';
import { VectorLayer } from "./layers";
import { TMapProps, IMapContext, TMapState } from "./map-types";
import "ol/ol.css";
import "./map.css";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { Vector as VL } from "ol/layer";
import { Style, Circle as CircleStyle, Stroke, Fill } from "ol/style";
import dummyDataRestaurant from "../../../assets/restaurantList/restaurants.json";

const Berlin = [13.409523443447888, 52.52111129522459];
const Middle = [0,0];
const Epitech = [13.328820, 52.508540];// long,lat

interface IMapLoc {
  name: string;
  lat: number;
  long: number;
}

useGeographic();

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: TMapState = {};
  restaurants: IMapLoc[];

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
    this.restaurants = this.getAllRestaurantsLocation()
  }

  private getAllRestaurantsLocation(): IMapLoc[] {
    const result : IMapLoc[] = [];
    result.pop();
    for (const elem of dummyDataRestaurant.restaurants) {
      const obj: IMapLoc = {name: elem.name, lat: elem.location.latitude,
        long: elem.location.longitude};
      result.push(obj);
    }
    return result;
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }
    const map = new Map({
      target: this.mapDivRef.current,
      view: new View({
        center: Berlin,
        zoom: 15,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });

    let markerList: Feature[] = [];
    markerList.pop();

    for (const elem of this.restaurants) {
      const obj = new Feature({
        type: 'geoMarker',
        geometry: new Point([elem.long, elem.lat]),
      });
      markerList.push(obj);
    }

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
    };

    const vectorLayer = new VL({
      source: new VectorSource({
        // features: [epitechMarker],
        features: markerList,
      }),
      style: function (feature) {
        return styles['geoMarker'];
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
      <div className="map" ref={this.mapDivRef}>
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <VectorLayer />
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
