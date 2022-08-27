import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import optionize from "../utils/optionize";
import styles from "../styles/forms.module.scss";
import markerColors from "../data/mapquest/marker-colors";
import mapTypes from "../data/mapquest/map-types";
import trafficTypes from "../data/mapquest/traffic-types";

export default function MapQuest() {
  const title = "MapQuest";
  const link = "https://www.mapquestapi.com/staticmap/";
  const apiLink = "https://developer.mapquest.com/documentation/";
  const maxSize = 3840;
  const minZoom = 1;
  const maxZoom = 18;

  const [location, setLocation] = useState("Albany, NY");
  const [zoom, setZoom] = useState(13);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [mapType, setMapType] = useState("map");
  const [format, setFormat] = useState("png");
  const [showMarker, setShowMarker] = useState(false);
  const [markerColor, setMarkerColor] = useState("blue");
  const [scaleBar, setScaleBar] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [traffic, setTraffic] = useState("flow");
  const [scalebarPos, setScalebarPos] = useState("top");
  const [API, setAPI] = useState("");

  function buildMapURL() {
    const params = new URLSearchParams("");
    params.set("location", location);
    params.set("size", `${width},${height}`);
    params.set("type", mapType);
    params.set("zoom", zoom.toString());
    params.set("imagetype", format);
    params.set("scalebar", scaleBar.toString());
    if (scaleBar) params.set("scalebarPos", scalebarPos);
    if (showTraffic) params.set("traffic", traffic);
    if (showMarker) params.set("showicon", `${markerColor}-1`);
    params.set("key", API || "YOUR-API-KEY-HERE");
    return `https://www.mapquestapi.com/staticmap/v4/getplacemap?${params}`;
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
      <Input
        id="location"
        label="Location"
        value={location}
        onChange={setLocation}
        type="text"
      />
      <Input
        id="zoom"
        label="Zoom"
        value={zoom}
        onChange={setZoom}
        min={minZoom}
        max={maxZoom}
        type="range"
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
        id="showMarker"
        label="Add a map marker"
        value={showMarker}
        onChange={setShowMarker}
      />
      {showMarker && (
        <Select
          id="markerColor"
          label="Marker color"
          value={markerColor}
          onChange={setMarkerColor}
          options={optionize(markerColors)}
        />
      )}
      <Checkbox
        id="scaleBar"
        label="Show the scale bar"
        value={scaleBar}
        onChange={setScaleBar}
      />
      {scaleBar && (
        <Select
          id="scaleBarPos"
          label="Scale bar position"
          value={scalebarPos}
          onChange={setScalebarPos}
          options={optionize(["top", "bottom"])}
        />
      )}
      <Select
        id="mapType"
        label="Map type"
        value={mapType}
        onChange={setMapType}
        options={mapTypes}
      />
      <Select
        id="imageFormat"
        label="Image format"
        value={format}
        onChange={setFormat}
        options={optionize(["png", "gif", "jpg", "jpeg"])}
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
