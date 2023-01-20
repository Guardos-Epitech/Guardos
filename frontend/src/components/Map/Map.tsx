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
import { Popover } from "bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "@src/utils/NavigateTo";

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
let popover: Popover;

function disposePopover() {
  if (popover) {
    popover.dispose();
    popover = undefined;
  }
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
  const [clickedFeature, setClickedFeature] = useState(null);

  const testMarkerL = useMemo(() => {
    let markerList: Feature[] = [];
    for (const elem of props.data) {
      const obj = new Feature({
        type: 'icon',
        geometry: new Point([elem.location.longitude, elem.location.latitude]),
        description: elem.name,
        address: elem.location.streetName + ' ' + elem.location.streetNumber + ' ' + elem.location.postalCode,
        index: elem.id,
        objectR: elem,
        name: 'Marker',
      });
      markerList.push(obj);
    };
    return markerList;
  }, [props.data]);

  const vectorLayer = useMemo(() => new VL({
    source: new VectorSource({
      features: testMarkerL,
    }),
    style: function (feature) {
      return stylesMarker['icon'];
    },
  }), [testMarkerL]);

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

  useEffect(() => {
    if (map) {
      map.getLayers().forEach((layer: any) => {
        if (layer && layer.get('name') === 'Marker') {
          map.removeLayer(layer);
        }
      });
      map.addLayer(vectorLayer);
    }
  }, [vectorLayer, map]);

  const popup = useMemo(() => new Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
  }), [element]);

  useEffect(() => {
    if (map) {
      map.addOverlay(popup);
    };
  }, [popup]);

  useEffect(() => {
    if (map) {
      map.on('click', function (evt: any) {
        console.log("click");
        const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature: Feature) {
          return feature;
        });
        disposePopover();
        if (!feature) {
          return;
        }
        popup.setPosition(evt.coordinate);
        popover = new Popover(element, {
          placement: 'top',
          html: true,
          content: feature.get('address'),
          title: feature.get('description'),
        });
        popover.show();
        setClickedFeature(feature.get('objectR'));
      });
      map.on('pointermove', function (e: any) {
        const pixel = map.getEventPixel(e.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
      });
      map.on('movestart', disposePopover);
    }
  }, [element, popup]);

  function renderDynamicMenu() {
    return (
      clickedFeature
    );
  }

  return (
    <div ref={mapElement} className={styles.map} id="map">
      <div id="popup" className="ol-popup">
        <div id="popup-content">
          <div className={styles.BtnPage}>
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
        </div>
      </div>
    </div>
  )
};

export default MapView;