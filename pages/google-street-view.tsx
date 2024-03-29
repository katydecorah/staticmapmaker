import Wrapper from "../components/wrapper";
import Input from "../components/form/input";
import { useState } from "react";
import stylesForms from "../styles/forms.module.scss";
import { sign } from "../utils/google/sign";

function GoogleStreetView() {
  const title = "Google Street View";
  const link =
    "https://developers.google.com/maps/documentation/streetview/request-streetview";
  const apiLink =
    "https://developers.google.com/maps/documentation/streetview/get-api-key";
  const maxSize = 640;

  const [location, setLocation] = useState("41.8893164,12.4932938");
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [API, setAPI] = useState("");
  const [signature, setSignature] = useState("");
  const [heading, setHeading] = useState(315);
  const [fov, setFov] = useState(90);
  const [pitch, setPitch] = useState(0);

  function buildMapURL() {
    const params = new URLSearchParams("");
    params.set("location", location);
    params.set("size", `${width}x${height}`);
    if (heading) params.set("heading", heading.toString());
    params.set("fov", fov.toString());
    params.set("pitch", pitch.toString());
    params.set("key", API || "YOUR-API-KEY-HERE");

    const unsigned = `https://maps.googleapis.com/maps/api/streetview?${params.toString()}`;
    return signature ? sign(unsigned, signature) : unsigned;
  }

  const mapcode = buildMapURL();

  return (
    <Wrapper
      title={title}
      link={link}
      mapcode={mapcode}
      location={location}
      auto={false}
      width={width}
      height={height}
      API={API}
      apiLink={apiLink}
    >
      <>
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

        <Input
          type="text"
          id="location"
          label="Location"
          value={location}
          onChange={setLocation}
        />

        <Input
          id="heading"
          label="Compass heading"
          value={heading}
          onChange={setHeading}
          type="range"
          min={0}
          max={360}
        />

        <Input
          id="fov"
          label="Field of view"
          value={fov}
          onChange={setFov}
          type="range"
          min={0}
          max={120}
        />
        <Input
          id="pitch"
          label="Pitch"
          value={pitch}
          onChange={setPitch}
          type="range"
          min={-90}
          max={90}
        />
        {/*<Input
          id="radius"
          label="Radius"
          value={radius}
          onChange={setRadius}
          type="range"
          min={0}
          max={100}
  /> */}
      </>
    </Wrapper>
  );
}

export default GoogleStreetView;
