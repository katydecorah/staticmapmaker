import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import optionize from "../utils/optionize";
import stylesForms from "../styles/forms.module.scss";
import { Marker, Markers } from "../components/markers/bing";
import useMarkers from "../components/markers/hook";

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
  const { markers, addMarker, updateMarker, removeMarker } = useMarkers<Marker>(
    {
      style: 64,
      coordinates: location,
      label: "Hi",
    }
  );

  function buildMapURL() {
    const params = new URLSearchParams("");
    params.set("mapSize", `${width},${height}`);
    if (showTraffic) params.set("mapLayer", "TrafficFlow");
    params.set("format", format);

    for (const marker of markers) {
      params.append(
        "pushpin",
        `${marker.coordinates};${marker.style};${marker.label}`
      );
    }

    params.set("key", API || "YOUR-API-KEY-HERE");

    return `https://dev.virtualearth.net/REST/V1/Imagery/Map/${mapType}/${encodeURIComponent(
      location
    )}${location ? `/${zoom}` : ""}?${params.toString()}`;
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
        options={[
          { value: "Aerial", text: "Aerial" },
          { value: "AerialWithLabels", text: "Aerial with a road overlay" },
          {
            value: "AerialWithLabelsOnDemand",
            text: "Aerial imagery with on-demand road overlay.",
          },
          { value: "Streetside", text: "Street-level imagery" },
          { value: "BirdsEye", text: "Bird's Eye (oblique-angle) imagery." },
          {
            value: "BirdsEyeWithLabels",
            text: "Bird’s Eye (oblique-angle) imagery with a road overlay.",
          },
          { value: "Road", text: "Road: Roads without additional imagery" },
          {
            value: "OrdnanceSurvey",
            text: "Ordnance Survey imagery (London area only)",
          },
          {
            value: "CanvasDark",
            text: "Canvas Dark: A dark version of the road maps.",
          },
          {
            value: "CanvasLight",
            text: "Canvas Light: A lighter version of the road maps which also has some of the details such as hill shading disabled.",
          },
          {
            value: "CanvasGray",
            text: "Canvas Gray: A grayscale version of the road maps.",
          },
        ]}
      />
      <Select
        id="format"
        label="Image format"
        value={format}
        onChange={setFormat}
        options={optionize(["png", "gif", "jpeg"])}
      />
      <Markers
        markers={markers}
        addMarker={addMarker}
        updateMarker={updateMarker}
        removeMarker={removeMarker}
      />
    </Wrapper>
  );
}
