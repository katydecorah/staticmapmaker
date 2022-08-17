import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import optionize from "../utils/optionize";
import IconTrash from "../components/svg/trash";
import IconPlus from "../components/svg/plus";
import styles from "../styles/providers.module.scss";
import stylesForms from "../styles/forms.module.scss";

export default function Bing() {
  const title = "Bing";
  const link = "https://msdn.microsoft.com/en-us/library/ff701724.aspx";
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
  const [markers, setMarkers] = useState([]);

  function addMarker() {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        style: 64,
        coordinates: location,
        label: "Hi",
      },
    ]);
  }

  function removeMarker(index: number) {
    setMarkers((prevMarkers) => prevMarkers.filter((m, i) => i !== index));
  }

  function buildMapURL() {
    return `https://dev.virtualearth.net/REST/V1/Imagery/Map/${mapType}/${encodeURIComponent(
      location
    )}${location ? `/${zoom}` : ""}?mapSize=${width},${height}${
      showTraffic ? "&mapLayer=TrafficFlow" : ""
    }&format=${format}${pushpinSet()}&key=${API ? API : "your-token-here"}`;
  }

  function pushpinSet() {
    return markers.reduce((string, marker) => {
      if (marker.coordinates) {
        string += `&pushpin=${marker.coordinates};${marker.style};${marker.label
          .split(" ")
          .join("%20")}`;
      }
      return string;
    }, "");
  }

  function setMarker(value: string, index: number, label: string) {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker, markerIndex) => {
        return {
          ...marker,
          ...(index === markerIndex && { [label]: value }),
        };
      })
    );
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
        popover="You'll need your Bing maps API token. Follow the link to get it."
        placeholder="API Key (required)"
        type="text"
        fieldSetClassName={API ? "" : stylesForms.error}
      />
      <Input
        id="location"
        label="Location"
        value={location}
        onChange={setLocation}
        popover="Try an address, a city, a place, or even latitude and longitude."
        type="text"
      />
      <Input
        id="zoom"
        label="Zoom"
        value={zoom}
        onChange={setZoom}
        popover="Zoom only available when using coordinates for location."
        min={minZoom}
        max={maxZoom}
        type="range"
      />
      <Input
        id="width"
        label="Width"
        value={width}
        onChange={setWidth}
        popover="Maximum width is 900px."
        min="80"
        max="900"
        type="number"
      />
      <Input
        id="height"
        label="Height"
        value={height}
        onChange={setHeight}
        popover="Maximum height is 834px."
        min="80"
        max="834"
        type="number"
      />
      <Checkbox
        id="showTraffic"
        label="Show traffic"
        value={showTraffic}
        onChange={setShowTraffic}
        popover="Show traffic data."
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
        popover="Change the type of map."
      />
      <Select
        id="format"
        label="Image format"
        value={format}
        onChange={setFormat}
        options={optionize(["png", "gif", "jpeg"])}
        popover="Change the image format."
      />
      <div className={stylesForms["fieldset"]}>
        <div className={styles["form-group"]}>
          {markers.map((marker, index) => {
            return (
              <div className={styles["flex-column"]} key={`marker-${index}`}>
                <Input
                  id="coordinates"
                  type="text"
                  placeholder="coordinates"
                  value={marker.coordinates}
                  onChange={(value) => setMarker(value, index, "coordinates")}
                />
                <Input
                  id="marker-style"
                  type="number"
                  min="0"
                  max="112"
                  placeholder="icon style"
                  value={marker.style}
                  onChange={(value) => setMarker(value, index, "style")}
                />
                <Input
                  id="marker-label"
                  type="text"
                  placeholder="label"
                  value={marker.label}
                  onChange={(value) => setMarker(value, index, "label")}
                />
                <button
                  aria-label="Remove marker"
                  className={styles.btn}
                  onClick={() => removeMarker(index)}
                >
                  <IconTrash />
                </button>
              </div>
            );
          })}
        </div>
        <div className={styles["form-group"]}>
          <button onClick={() => addMarker()} className={styles.btn}>
            <IconPlus /> Add a pushpin
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
