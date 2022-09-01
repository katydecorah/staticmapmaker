import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import styles from "../styles/forms.module.scss";
import mapTypes from "../data/mapquest/map-types";
import trafficTypes from "../data/mapquest/traffic-types";
import { Markers, Marker, buildMarkers } from "../components/markers/mapquest";
import useMarkers from "../components/markers/hook";
import scalebarPositions from "../data/mapquest/scalebar";
import { Routes, Leg } from "../components/routes/mapquest";
import useRoute from "../components/routes/hook";

export default function MapQuest() {
  const title = "MapQuest";
  const link = "https://www.mapquestapi.com/staticmap/";
  const apiLink =
    "https://developer.mapquest.com/documentation/static-map-api/v5/";
  const maxSize = 1920;
  const minZoom = 0;
  const maxZoom = 20;

  const [location, setLocation] = useState("Albany, NY");
  const [zoom, setZoom] = useState(13);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [mapType, setMapType] = useState("map");
  const [scalebar, setScalebar] = useState("");
  const [showTraffic, setShowTraffic] = useState(false);
  const [traffic, setTraffic] = useState("flow");
  const [API, setAPI] = useState("");
  const [retina, setRetina] = useState(true);
  const [fit, setFit] = useState(false);
  const { markers, addMarker, updateMarker, removeMarker } = useMarkers<Marker>(
    {
      coordinates: location,
      color: "#285A98",
      size: "md",
      symbol: "",
      type: "marker",
    }
  );
  const { route, addRoute, updateRoute, removeRoute } = useRoute<Leg>([
    {
      index: 0,
      location: "Albany, NY",
    },
    {
      index: 1,
      location: "Troy, NY",
    },
  ]);

  function buildMapURL() {
    const params = new URLSearchParams("");

    if (markers.length > 0) {
      params.set("locations", buildMarkers(markers));
    } else if (route.length > 0) {
      params.set("start", route[0].location);
      params.set("end", route[1].location);
    } else {
      params.set("center", location);
    }

    if (fit !== true && route.length === 0) {
      params.set("zoom", zoom.toString());
    }
    params.set("size", `${width},${height}${retina ? "@2x" : ""}`);
    params.set("type", mapType);

    if (scalebar) {
      params.set("scalebar", `true|${scalebar}`);
    }

    if (showTraffic === true) {
      params.set("traffic", traffic);
    }
    params.set("key", API || "YOUR-API-KEY-HERE");

    return `https://www.mapquestapi.com/staticmap/v5/map?${params}`;
  }

  const mapcode = buildMapURL();

  return (
    <Wrapper
      title={title}
      link={link}
      mapcode={mapcode}
      location={location}
      width={width}
      height={height}
      API={API}
      apiLink={apiLink}
    >
      <Input
        id="api"
        label="API Key"
        value={API}
        onChange={setAPI}
        placeholder="API Key (required)"
        type="text"
        fieldSetClassName={API ? " " : styles.error}
      />

      {route.length === 0 && (
        <>
          <Input
            id="location"
            label="Location"
            value={location}
            onChange={setLocation}
            type="text"
            disabled={markers.length > 0}
          />
          <Input
            id="zoom"
            label="Zoom"
            value={zoom}
            onChange={setZoom}
            min={minZoom}
            max={maxZoom}
            type="range"
            disabled={fit === true}
          />
        </>
      )}

      <Routes
        route={route}
        addRoute={addRoute}
        updateRoute={updateRoute}
        removeRoute={removeRoute}
      />

      <Markers
        markers={markers}
        addMarker={addMarker}
        updateMarker={updateMarker}
        removeMarker={removeMarker}
      />
      <Checkbox
        id="autofit"
        label="Fit markers to map"
        value={fit}
        onChange={setFit}
        disabled={markers.length === 0}
      />
      <Input
        id="width"
        label="Width"
        value={width}
        onChange={setWidth}
        min="0"
        max={maxSize}
        type="number"
      />
      <Input
        id="height"
        label="Height"
        value={height}
        onChange={setHeight}
        min="0"
        max={maxSize}
        type="number"
      />
      <Checkbox
        id="retina"
        label="Retina"
        value={retina}
        onChange={setRetina}
      />

      <Select
        id="scalebar"
        label="Scale bar"
        value={scalebar}
        onChange={setScalebar}
        options={scalebarPositions}
      />

      <Select
        id="mapType"
        label="Map type"
        value={mapType}
        onChange={setMapType}
        options={mapTypes}
      />
      <Checkbox
        id="showTraffic"
        label="Show traffic"
        value={showTraffic}
        onChange={setShowTraffic}
      />
      {showTraffic && (
        <Select
          id="traffic"
          label="Traffic type"
          value={traffic}
          onChange={setTraffic}
          options={trafficTypes}
        />
      )}
    </Wrapper>
  );
}
