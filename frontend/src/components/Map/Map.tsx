import React, { useRef, useEffect, useState, useMemo } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Point } from 'ol/geom';
import { useGeographic } from 'ol/proj';
import "ol/ol.css";
import { Feature, Overlay } from "ol";
import VectorSource from "ol/source/Vector";
import { Vector as VL } from "ol/layer";
import { Style, Icon } from "ol/style";
import markerIcon from "../../assets/marker.png";
import { IRestaurantFrontEnd } from "@src/filter/filter";
import styles from "./Map.module.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "@src/utils/NavigateTo";
// import Popover from "@mui/material/Popover";

const Berlin = [13.409523443447888, 52.52111129522459];
const Epitech = [13.328820, 52.508540];// long,lat

useGeographic();

const layer = new TileLayer({
  source: new OSM(),
});

const view = new View({
  center: Epitech,
  zoom: 15,
});

const stylesMarker = {
  'icon': new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: markerIcon,
      scale: 0.05,
    }),
  }),
};

const PageBtn = () => {
  return createTheme({
    typography: {
      button: {
        fontFamily: "Montserrat",
        textTransform: "none",
        fontSize: "1.13rem",
        fontWeight: "500",
      },
    },
    palette: {
      primary: {
        main: "#AC2A37",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#094067",
        contrastText: "#ffffff",
      },
    },
    shape: {
      borderRadius: 5,
    },
  });
};

interface MapProps {
  data: IRestaurantFrontEnd[]
}

const MapView = (props: MapProps) => {
  const navigate = useNavigate();
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const element = document.getElementById('popup');
  const popupContent = document.getElementById('popup-content');
  const closer = document.getElementById('popup-closer');
  const [clickedFeature, setClickedFeature] = useState(null);

  //create all markers with all infos
  const testMarkerL = useMemo(() => {
    let markerList: Feature[] = [];
    if (props.data) {
      for (const elem of props.data) {
        const obj = new Feature({
          type: 'icon',
          geometry: new Point([parseFloat(elem.location.longitude), parseFloat(elem.location.latitude)]),
          description: elem.name,
          telephone: elem.phoneNumber,
          address: elem.location.streetName + ' ' + elem.location.streetNumber + ' ' + elem.location.postalCode,
          index: elem.id,
          objectR: elem,
          name: 'Marker',
        });
        markerList.push(obj);
      };
    }
    return markerList;
  }, [props.data]);

  //create marker icons 
  const vectorLayer = useMemo(() => new VL({
    source: new VectorSource({
      features: testMarkerL,
    }),
    style: function (feature) {
      return stylesMarker['icon'];
    },
  }), [testMarkerL]);

  vectorLayer.set('name', 'markerLayer');

  //create new map 
  useEffect(() => {
    if (!mapElement.current) {
      return;
    }

    const map = new Map({
      target: mapElement.current,
      view: view,
      layers: [layer],
    });
    setMap(map);

  }, []);

  // set all markers
  useEffect(() => {
    if (map) {
      map.getLayers().forEach((layer: any) => {
        console.log(layer);
        if (layer && layer.get('name') === 'markerLayer') {
          map.removeLayer(layer);
        }
      });
      map.addLayer(vectorLayer);
    }
  }, [vectorLayer, map]);

  // create popup
  const popup = useMemo(() => new Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
  }), [element]);

  // //add popup to map
  useEffect(() => {
    if (map) {
      map.addOverlay(popup);
    };
  }, [popup]);

  //if click on marker open popup
  useEffect(() => {
    if (map) {
      map.on('click', function (evt: any) {
        console.log("click");
        const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature: Feature) {
          return feature;
        });
        if (!feature) {
          return;
        }
        popupContent.innerHTML = feature.get('description') + "<br/><p>tel.: " + feature.get('telephone') + "</p><br/><p>address: " + feature.get('address') + "</p>";
        popup.setPosition(evt.coordinate);
        setClickedFeature(feature.get('objectR'));
      });
      map.on('pointermove', function (e: any) {
        const pixel = map.getEventPixel(e.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
      });
    }
  }, [popup, map]);

  function renderDynamicMenu() {
    return (
      clickedFeature
    );
  }

  return (
    <>
      <div ref={mapElement} className={styles.map} id="map" />
      <div id="popup" className={styles.popup}>
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        <div className="popover-content" id="popup-content"></div>
        <ThemeProvider theme={PageBtn()}>
          <Button
            variant="contained"
            sx={{ width: "12.13rem" }}
            onClick={() => NavigateTo("/menu", navigate, renderDynamicMenu())}
          >
            Restaurant page
          </Button>
        </ThemeProvider>
      </div>
      {/* </div> */}
    </>
  )
};

export default MapView;