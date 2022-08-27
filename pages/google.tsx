import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import optionize from "../utils/optionize";
import stylesForms from "../styles/forms.module.scss";
import { sign } from "../utils/google/sign";
import {
  buildMarkerRequest,
  Marker,
  Markers,
} from "../components/markers/google";
import useMarkers from "../components/markers/hook";

function Google() {
  const title = "Google";
  const link = "https://developers.google.com/maps/documentation/staticmaps/";
  const apiLink =
    "https://developers.google.com/maps/documentation/maps-static/get-api-key";
  const maxSize = 640;
  const minZoom = 0;
  const maxZoom = 22;

  const [location, setLocation] = useState("Albany, NY");
  const [zoom, setZoom] = useState(13);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [mapType, setMapType] = useState("roadmap");
  const [format, setFormat] = useState("png");
  const [scale, setScale] = useState(true);
  const [autoCenter, setAutoCenter] = useState(false);
  const [API, setAPI] = useState("");
  const [signature, setSignature] = useState("");
  const [style, setStyle] = useState("");
  const { markers, addMarker, updateMarker, removeMarker } = useMarkers<Marker>(
    {
      markerSize: "mid",
      coordinates: location,
      markerLabel: "1",
      markerColor: "#2e3a5c",
      markerCustom: "",
      markerShadow: false,
    }
  );

  function buildMapURL() {
    const scaleNum = scale === true ? 2 : 1;
    const params = new URLSearchParams("");
    if (autoCenter === true) params.set("auto", "");
    if (!autoCenter) {
      params.set("center", location);
      params.set("zoom", zoom.toString());
    }
    params.set("scale", scaleNum.toString());
    params.set("size", `${width}x${height}`);

    if (style) {
      params.set("style", style);
    } else {
      params.set("maptype", mapType);
    }

    params.set("format", format);
    params.set("key", API || "YOUR-API-KEY-HERE");

    const unsigned = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}${buildMarkerRequest(
      markers
    )}`;
    return signature ? sign(unsigned, signature) : unsigned;
  }

  const mapcode = buildMapURL();

  return (
    <Wrapper
      title={title}
      link={link}
      mapcode={mapcode}
      location={location}
      auto={autoCenter}
      width={width}
      height={height}
      API={API}
      apiLink={apiLink}
    >
      <Input
        type="text"
        id="api"
        label="API Key"
        value={API}
        onChange={setAPI}
        placeholder="API Key (required)"
        fieldSetClassName={API ? " " : stylesForms.error}
      />

      <Input
        type="text"
        id="signature"
        label="Signature"
        value={signature}
        onChange={setSignature}
        placeholder="API signature (recommended)"
      />

      <Checkbox
        id="scale"
        label="Retina (2x)"
        value={scale}
        onChange={setScale}
      />

      <Input
        type="number"
        id="width"
        label="Width"
        value={width}
        onChange={setWidth}
        min={0}
        max={maxSize}
      />

      <Input
        type="number"
        id="height"
        label="Height"
        value={height}
        onChange={setHeight}
        min={0}
        max={maxSize}
      />

      <Select
        id="mapType"
        label="Map type"
        value={mapType}
        onChange={setMapType}
        options={optionize(["roadmap", "terrain", "satellite", "hybrid"])}
        disabled={style !== ""}
      />

      <Input
        id="style"
        label="Custom style"
        value={style}
        onChange={setStyle}
        type="text"
        placeholder="style=feature:myFeatureArgument|element:myElementArgument|myRule1:myRule1Argument|myRule2:myRule2Argument"
      />

      <Select
        id="format"
        label="Image format"
        value={format}
        onChange={setFormat}
        options={optionize(["png", "gif", "jpg", "png32", "jpg-baseline"])}
      />

      {!autoCenter && (
        <>
          <Input
            type="text"
            id="location"
            label="Location"
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
            max={maxZoom}
          />
        </>
      )}

      <Checkbox
        id="autoCenter"
        label="Fit map to markers"
        value={autoCenter}
        onChange={setAutoCenter}
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

export default Google;
