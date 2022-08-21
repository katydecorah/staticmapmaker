import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import optionize from "../utils/optionize";
import stylesForms from "../styles/forms.module.scss";

export default function Here() {
  const title = "Here";
  const link =
    "https://developer.here.com/documentation/map-image/dev_guide/topics/introduction.html";
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
  const [format, setFormat] = useState("0");

  function buildMapURL() {
    return `https://image.maps.ls.hereapi.com/mia/1.6/mapview?c=${location}&w=${width}&h=${height}&z=${zoom}&nodot=${noDot}&style=${style}${
      mapHeader ? `&i=1` : ""
    }${language ? `&ml=${language}` : ""}${format ? `&f=${format}` : ""}${
      rotate ? `&ra=${rotate}` : ""
    }&apiKey=${API ? API : "your-token-here"}`;
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
        id="formate"
        value={format}
        onChange={setFormat}
        label="Format"
        options={[
          { value: "0", text: "PNG" },
          { value: "1", text: "JPEG" },
          { value: "2", text: "GIF" },
          { value: "3", text: "BMP" },
          { value: "4", text: "PNG8" },
          { value: "5", text: "SVG (only for companylogo)" },
        ]}
      />
      <Select
        id="language"
        value={language}
        onChange={setLanguage}
        label="Language"
        options={[
          { value: "", text: "" },
          { value: "ara", text: "Arabic" },
          { value: "chi", text: "Chinese (simplified)" },
          { value: "cht", text: "Chinese (traditional)" },
          { value: "dut", text: "Dutch" },
          { value: "eng", text: "English" },
          { value: "fre", text: "French" },
          { value: "ger", text: "German" },
          { value: "gle", text: "Gaelic" },
          { value: "gre", text: "Greek" },
          { value: "heb", text: "Hebrew" },
          { value: "hin", text: "Hindi" },
          { value: "ind", text: "Indonesian" },
          { value: "ita", text: "Italian" },
          { value: "per", text: "Persian" },
          { value: "pol", text: "Polish" },
          { value: "por", text: "Portuguese" },
          { value: "rus", text: "Russian" },
          { value: "sin", text: "Sinhalese" },
          { value: "spa", text: "Spanish" },
          { value: "tha", text: "Thai" },
          { value: "tur", text: "Turkish" },
          { value: "ukr", text: "Ukranian" },
          { value: "urd", text: "Urdu" },
          { value: "vie", text: "Vietnamese" },
          { value: "wel", text: "Welsh" },
        ]}
      />
    </Wrapper>
  );
}
