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
import dummyDataRestaurant from "../../../assets/restaurantList/restaurants.json";
import markerIcon from "../../../assets/marker.png";

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

    const map = new Map({
      target: this.mapDivRef.current,
      view: new View({
        center: Berlin,
        zoom: 15,
      }),
      layers: [layer],
    });

    let markerList: Feature[] = [];
    markerList.pop();

    for (const elem of this.restaurants) {
      const obj = new Feature({
        type: 'icon',
        geometry: new Point([elem.long, elem.lat]),
        description: elem.name,
        address: elem.street + ' ' + elem.streetNumber + ' ' + elem.postal,
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
