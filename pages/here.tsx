import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import optionize from "../utils/optionize";
import stylesForms from "../styles/forms.module.scss";
import formats from "../data/here/formats";
import languages from "../data/here/languages";
import ppis from "../data/here/ppi";
import scalebars from "../data/here/scalebars";
import { Marker, Markers } from "../components/markers/here";
import useMarkers from "../components/markers/hook";

export default function Here() {
  const title = "HERE";
  const link =
    "https://developer.here.com/documentation/map-image/dev_guide/topics/introduction.html";
  const apiLink =
    "https://developer.here.com/documentation/map-image/dev_guide/topics/request-format.html";
  const minZoom = 0;
  const maxZoom = 22;

  const [location, setLocation] = useState("42.6564,-73.7638");
  const [zoom, setZoom] = useState(13);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [API, setAPI] = useState("");
  const [noDot, setNoDot] = useState(false);
  const [style, setStyle] = useState("flame");
  const [mapHeader, setMapHeader] = useState(false);
  const [language, setLanguage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [format, setFormat] = useState("1");
  const [noCrop, setNoCrop] = useState(false);
  const [pip, setPip] = useState(false);
  const [pipZoom, setPipZoom] = useState(14);
  const [ppi, setPpi] = useState("72");
  const [scalebar, setScalebar] = useState("");
  const { markers, addMarker, updateMarker, removeMarker } = useMarkers<Marker>(
    {
      coordinates: "42.6564,-73.7638",
    }
  );
  const [markerColor, setMarkerColor] = useState("#2e3a5c");
  const [markerLabel, setMarkerLabel] = useState("0");
  const [markerTheme, setMarkerTheme] = useState("2");

  function buildMapURL() {
    const params = new URLSearchParams("");
    params.set("c", location);
    params.set("w", width.toString());
    params.set("h", height.toString());
    params.set("z", zoom.toString());
    params.set("nodot", noDot.toString());
    params.set("style", style);
    if (mapHeader) params.set("i", "1");
    if (language) params.set("ml", language);
    if (format) params.set("f", format);
    if (rotate) params.set("ra", rotate.toString());
    if (noCrop) params.set("nocrop", "");
    if (pip && pipZoom) params.set("pip", pipZoom.toString());
    if (ppi) params.set("ppi", ppi);
    if (scalebar) params.set("sb", scalebar);
    if (markers.length > 0) {
      params.set("poi", markers.map((m) => m.coordinates).join(","));
      params.set("poifc", `FF${markerColor.replace("#", "")}`);
      params.set("poilbl", markerLabel);
      params.set("poithm", markerTheme);
    }

    params.set("apiKey", API || "YOUR-API-TOKEN-HERE");
    return `https://image.maps.ls.hereapi.com/mia/1.6/mapview?${params.toString()}`;
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
      <Checkbox id="dot" label="No dot" value={noDot} onChange={setNoDot} />

      <Select
        id="style"
        value={style}
        onChange={setStyle}
        label="Map style"
        options={optionize(["alps", "dreamworks", "flame", "fleet", "mini"])}
      />
      <Checkbox
        id="map-header"
        label="Map header"
        value={mapHeader}
        onChange={setMapHeader}
      />
      <Checkbox
        id="no-crop"
        label="Don't crop labels"
        value={noCrop}
        onChange={setNoCrop}
      />
      <Input
        id="rotate"
        label="Rotate"
        value={rotate}
        onChange={setRotate}
        min="0"
        max="360"
        type="range"
      />

      <Select
        id="format"
        value={format}
        onChange={setFormat}
        label="Format"
        options={formats}
      />
      <Select
        id="ppi"
        value={ppi}
        onChange={setPpi}
        label="Resolution"
        options={ppis}
      />
      <Select
        id="scalebar"
        value={scalebar}
        onChange={setScalebar}
        label="Scalebar"
        options={scalebars}
      />
      <Checkbox
        id="pip"
        label="Enable picture in picture"
        value={pip}
        onChange={setPip}
      />
      {pip && (
        <Input
          id="pip-zoom"
          label="Picture in picture zoom"
          value={pipZoom}
          onChange={setPipZoom}
          min={minZoom}
          max={maxZoom}
          type="range"
        />
      )}
      <Select
        id="language"
        value={language}
        onChange={setLanguage}
        label="Language"
        options={languages}
      />
      <Markers
        markers={markers}
        addMarker={addMarker}
        updateMarker={updateMarker}
        removeMarker={removeMarker}
        markerColor={markerColor}
        setMarkerColor={setMarkerColor}
        markerLabel={markerLabel}
        setMarkerLabel={setMarkerLabel}
        markerTheme={markerTheme}
        setMarkerTheme={setMarkerTheme}
      />
    </Wrapper>
  );
}
