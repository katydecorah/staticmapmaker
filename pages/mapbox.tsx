import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import stylesForms from "../styles/forms.module.scss";
import {
  Markers,
  useMarkers,
  buildMarkerRequest,
} from "../components/markers/mapbox";

export default function Mapbox() {
  const title = "Mapbox";
  const link = "https://docs.mapbox.com/api/maps/#static-images";
  const apiLink =
    "https://docs.mapbox.com/api/overview/#access-tokens-and-token-scopes";
  const minZoom = 0;
  const maxZoom = 22;
  const { markers, addMarker, updateMarker, removeMarker } = useMarkers();

  const [API, setAPI] = useState("");
  const [mapID, setMapID] = useState("");
  const [mapboxID, setMapboxID] = useState("mapbox/outdoors-v11");
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [bearing, setBearing] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [retina, setRetina] = useState(true);
  const [attribution, setAttribution] = useState(true);
  const [logo, setLogo] = useState(true);
  const [auto, setAuto] = useState(false);
  const [location, setLocation] = useState("-73.7638,42.6564");
  const [zoom, setZoom] = useState(13);
  const [maxSize, setMaxSize] = useState(1280);

  const mapcode = buildMapURL();

  function buildMapURL() {
    const params = new URLSearchParams("");
    params.set("attribution", attribution.toString());
    params.set("logo", logo.toString());
    params.set("access_token", API || "YOUR-ACCESS-TOKEN-HERE");

    return `https://api.mapbox.com/styles/v1/${
      mapID || mapboxID
    }/static${buildMarkerRequest(markers)}${
      auto ? "auto" : `${location},${zoom},${bearing},${pitch}`
    }/${width}x${height}${retina ? "@2x" : ""}?${params.toString()}`;
  }

  return (
    <Wrapper
      title={title}
      link={link}
      mapcode={mapcode}
      location={location}
      auto={auto}
      width={width}
      height={height}
      API={API}
      apiLink={apiLink}
    >
      <>
        <Input
          type="text"
          label="Access token"
          id="api"
          value={API}
          onChange={setAPI}
          fieldSetClassName={API ? " " : stylesForms.error}
          placeholder="Access token (required)"
        />
        <Input
          type="text"
          label="Your style"
          id="mapid"
          value={mapID}
          onChange={setMapID}
          placeholder="username/style_id"
        />
        <Select
          label="Mapbox style"
          id="mapboxID"
          options={[
            { value: "mapbox/streets-v11", text: "Streets" },
            { value: "mapbox/light-v10", text: "Light" },
            { value: "mapbox/dark-v10", text: "Dark" },
            { value: "mapbox/satellite-v9", text: "Satellite" },
            {
              value: "mapbox/satellite-streets-v11",
              text: "Satellite streets",
            },
            { value: "mapbox/outdoors-v11", text: "Outdoors" },
          ]}
          value={mapboxID}
          onChange={setMapboxID}
          disabled={mapID !== ""}
        />
        <Input
          type="number"
          label="Width"
          id="width"
          value={width}
          onChange={setWidth}
          min={0}
          max={maxSize}
        />
        <Input
          type="number"
          label="Height"
          id="height"
          value={height}
          onChange={setHeight}
          min={0}
          max={maxSize}
        />

        <Checkbox
          label="Retina maps"
          id="retina"
          value={retina}
          onChange={setRetina}
        />
        <Checkbox
          label="Show attribution"
          id="attribution"
          value={attribution}
          onChange={setAttribution}
        />
        <Checkbox label="Show logo" id="logo" value={logo} onChange={setLogo} />

        {!auto && (
          <>
            <Input
              type="text"
              label="Long, lat"
              id="location"
              value={location}
              onChange={setLocation}
            />
            <Input
              type="range"
              label="Zoom"
              id="zoom"
              value={zoom}
              onChange={setZoom}
              min={minZoom}
              step="0.25"
              max={maxZoom}
            />
            <Input
              type="range"
              label="Bearing (rotate)"
              id="bearing"
              value={bearing}
              onChange={setBearing}
              min="0"
              max="360"
            />
            <Input
              type="range"
              label="Pitch (tilt)"
              id="pitch"
              value={pitch}
              onChange={setPitch}
              min="0"
              max="60"
            />
          </>
        )}
        <Checkbox
          label="Fit map to markers"
          id="auto"
          value={auto}
          onChange={setAuto}
        />

        <Markers
          markers={markers}
          addMarker={addMarker}
          updateMarker={updateMarker}
          removeMarker={removeMarker}
        />
      </>
    </Wrapper>
  );
}
