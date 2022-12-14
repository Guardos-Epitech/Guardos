import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { OSM, Vector as VectorSource } from "ol/source";
import {Point} from 'ol/geom';
import {useGeographic} from 'ol/proj';
import { VectorLayer } from "./layers";
import { TMapProps, IMapContext, TMapState } from "./map-types";
import "ol/ol.css";
import "./map.css";
import { Feature } from "ol";

const Berlin = [13.409523443447888, 52.52111129522459];
const Middle = [0,0];

useGeographic();

const point = new Point(Berlin);

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: TMapState = {};

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    const map = new Map({
      target: this.mapDivRef.current,
      view: new View({
        center: Middle,
        zoom: 6,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
          // source: new XYZ({
          //   url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          // }),
        }),
      ],
    });

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
