import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import optionize from "../utils/optionize";
import stylesForms from "../styles/forms.module.scss";
import { Marker, Markers } from "../components/markers/bing";
import useMarkers from "../components/markers/hook";
import { Routes, Leg } from "../components/routes/bing";
import useRoute from "../components/routes/hook";
import mapTypes from "../data/bing/map-types";

export default function Bing() {
  const title = "Bing";
  const link = "https://msdn.microsoft.com/en-us/library/ff701724.aspx";
  const apiLink =
    "https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key";
  const minZoom = 0;
  const maxZoom = 21;

  const [location, setLocation] = useState("42.6564,-73.7638");
  const [zoom, setZoom] = useState(13);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [mapType, setMapType] = useState("Road");
  const [format, setFormat] = useState("png");
  const [showTraffic, setShowTraffic] = useState(false);
  const [API, setAPI] = useState("");
  const [dpi, setDpi] = useState(false);
  const [declutterPins, setDeclutterPins] = useState(false);
  const [style, setStyle] = useState("");
  const { markers, addMarker, updateMarker, removeMarker } = useMarkers<Marker>(
    {
      style: 1,
      coordinates: location,
      label: "Hi",
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
    const locationOrRoute =
      route.length > 0
        ? "Routes"
        : `${encodeURIComponent(location)}${location ? `/${zoom}` : ""}`;
    const params = new URLSearchParams("");
    params.set("mapSize", `${width},${height}`);
    if (showTraffic) params.set("mapLayer", "TrafficFlow");
    params.set("format", format);
    if (dpi === true) params.set("dpi", "Large");
    if (declutterPins === true) params.set("dcl", "1");

    if (style) params.set("st", style);

    if (markers.length > 0) {
      for (const marker of markers) {
        params.append(
          "pushpin",
          `${marker.coordinates};${marker.style};${marker.label}`
        );
      }
    }

    if (route.length > 0) {
      for (const leg of route) {
        params.set(`wp.${leg.index}`, `${leg.location}`);
      }
    }

    params.set("key", API || "YOUR-API-KEY-HERE");

    return `https://dev.virtualearth.net/REST/V1/Imagery/Map/${mapType}/${locationOrRoute}?${params.toString()}`;
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
        fieldSetClassName={API ? "" : stylesForms.error}
      />
      {route.length === 0 && (
        <>
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
        </>
      )}
      <Routes
        route={route}
        addRoute={addRoute}
        updateRoute={updateRoute}
        removeRoute={removeRoute}
      />

      <Input
        id="width"
        label="Width"
        value={width}
        onChange={setWidth}
        min="80"
        max="900"
        type="number"
      />
      <Input
        id="height"
        label="Height"
        value={height}
        onChange={setHeight}
        min="80"
        max="834"
        type="number"
      />
      <Checkbox
        id="showTraffic"
        label="Show traffic"
        value={showTraffic}
        onChange={setShowTraffic}
      />
      <Select
        id="mapType"
        label="Map type"
        value={mapType}
        onChange={setMapType}
        options={mapTypes}
      />
      <Input
        id="style"
        type="text"
        placeholder="[elementName]|[styleParam1]:[value];[styleParam2]:[value];"
        label="Custom map style"
        value={style}
        onChange={setStyle}
      />
      <Select
        id="format"
        label="Image format"
        value={format}
        onChange={setFormat}
        options={optionize(["png", "gif", "jpeg"])}
      />
      <Checkbox
        id="dpi"
        label="High resolution labels"
        value={dpi}
        onChange={setDpi}
      />
      <Markers
        markers={markers}
        addMarker={addMarker}
        updateMarker={updateMarker}
        removeMarker={removeMarker}
      />
      {markers.length > 0 && (
        <Checkbox
          value={declutterPins}
          id="declutter-pins"
          label="Declutter pins"
          onChange={setDeclutterPins}
        />
      )}
    </Wrapper>
  );
}
