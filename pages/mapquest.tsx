import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import optionize from "../utils/optionize";
import styles from "../styles/forms.module.scss";

export default function MapQuest() {
  const title = "MapQuest";
  const link = "https://www.mapquestapi.com/staticmap/";
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
    return `https://www.mapquestapi.com/staticmap/v4/getplacemap?key=${
      API || "YOUR-API-KEY-HERE"
    }&location=${encodeURIComponent(
      location
    )}&size=${width},${height}&type=${mapType}&zoom=${zoom}&imagetype=${format}&scalebar=${scaleBar}${
      scaleBar ? `&scalebarPos=${scalebarPos}` : ""
    }${showTraffic ? `&traffic=${traffic}` : ""}${
      showMarker ? `&showicon=${markerColor}-1` : ""
    }`;
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
          options={optionize([
            "blue",
            "green",
            "orange",
            "purple",
            "white",
            "yellow",
            "blue_1",
            "blue_2",
            "blue_3",
            "blue_4",
            "bluegreen_1",
            "bluegreen_2",
            "bluegreen_3",
            "green_1",
            "green_2",
            "green_3",
            "green_4",
            "orange_1",
            "orange_2",
            "orange_3",
            "pink_1",
            "pink_2",
            "pink_3",
            "purple_1",
            "purple_2",
            "purple_3",
            "purple_4",
            "red_1",
            "red_2",
            "white_1",
            "yellow_1",
            "yellow_2",
            "yellow_3",
          ])}
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
        options={[
          { value: "map", text: "map" },
          { value: "sat", text: "satellite" },
          { value: "hyb", text: "hybrid" },
        ]}
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
          options={[
            { value: "flow", text: "flowing" },
            { value: "con", text: "construction" },
            { value: "inc", text: "incidents" },
          ]}
        />
      )}
    </Wrapper>
  );
}
