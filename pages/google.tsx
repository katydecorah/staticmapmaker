import Wrapper from "../components/wrapper";
import Checkbox from "../components/form/checkbox";
import Input from "../components/form/input";
import Select from "../components/form/select";
import { useState } from "react";
import markerLabels from "../data/google/marker-labels";
import optionize from "../utils/optionize";
import IconTrash from "../components/svg/trash";
import IconPlus from "../components/svg/plus";
import styles from "../styles/providers.module.scss";
import stylesForms from "../styles/forms.module.scss";
import { sign } from "../utils/google/sign";

function Google() {
  const title = "Google";
  const link = "https://developers.google.com/maps/documentation/staticmaps/";
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
  const [API, setAPI] = useState();
  const [signature, setSignature] = useState();
  const [markers, setMarkers] = useState([]);

  function addMarker() {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        markerSize: "mid",
        coordinates: location,
        markerLabel: "1",
        markerColor: "#2e3a5c",
        markerCustom: "",
        markerShadow: false,
      },
    ]);
  }

  function removeMarker(index) {
    setMarkers((prevMarkers) => prevMarkers.filter((m, i) => i !== index));
  }

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
    params.set("maptype", mapType);
    params.set("format", format);
    params.set("key", API || "YOUR-API-KEY-HERE");

    const unsigned = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}${pushpinSet()}`;
    return signature ? sign(unsigned, signature) : unsigned;
  }

  function createMarker(marker) {
    const label = marker.markerLabel == "default" ? "" : marker.markerLabel;
    return `&markers=size:${marker.markerSize}%7Ccolor:${marker.markerColor
      .split("#")
      .join("0x")}%7Clabel:${label}%7C${encodeURIComponent(
      marker.coordinates
    )}`;
  }

  function createCustomMarker(marker) {
    return `&markers=icon:${marker.markerCustom}%7Cshadow:${
      marker.markerShadow
    }%7C${encodeURIComponent(marker.coordinates)}`;
  }

  function pushpinSet() {
    return markers
      .reduce((arr, marker) => {
        if (marker.coordinates) {
          arr.push(
            marker.markerCustom
              ? createCustomMarker(marker)
              : createMarker(marker)
          );
        }
        return arr;
      }, [])
      .join("|");
  }

  function setMarker(value, index, label) {
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
      auto={autoCenter}
      width={width}
      height={height}
      API={API}
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
        />

        <Select
          id="format"
          label="Image format"
          value={format}
          onChange={setFormat}
          options={optionize(["png", "gif", "jpg"])}
        />

        {!autoCenter && (
          <>
            <Input
              type="text"
              id="location"
              label="Location"
              value={location}
              onChange={setLocation}
              disabled={autoCenter == true}
            />

            <Input
              type="range"
              label="Zoom"
              id="zoom"
              value={zoom}
              onChange={setZoom}
              min={minZoom}
              max={maxZoom}
              disabled={autoCenter == true}
            />
          </>
        )}

        <Checkbox
          id="autoCenter"
          label="Fit map to markers"
          value={autoCenter}
          onChange={setAutoCenter}
        />

        <div className={stylesForms["fieldset"]}>
          {markers.map((marker, index) => {
            return (
              <div key={`${index}-marker`} className={styles["form-group"]}>
                <div className={styles["marker-title"]}>
                  <div>Marker {marker.coordinates}</div>
                  <button
                    aria-label="Remove marker"
                    className={styles["btn"]}
                    onClick={() => removeMarker(index)}
                  >
                    <IconTrash />
                  </button>
                </div>
                <div className={styles["marker-fields"]}>
                  <Input
                    id={`${index}-marker-coordinates`}
                    type="text"
                    value={marker.coordinates}
                    onChange={(value) => setMarker(value, index, "coordinates")}
                    placeholder="Address or coordinates"
                  />
                  {!marker.markerCustom && (
                    <div className={styles["flex-column"]}>
                      <Select
                        value={marker.markerLabel}
                        onChange={(value) =>
                          setMarker(value, index, "markerLabel")
                        }
                        options={optionize(markerLabels)}
                        id={`${index}-marker-label`}
                        fieldSetClassName={styles.sm}
                      />
                      <Input
                        value={marker.markerColor}
                        onChange={(value) =>
                          setMarker(value, index, "markerColor")
                        }
                        type="color"
                        id={`${index}-marker-color`}
                        fieldSetClassName={styles.sm}
                      />
                      <Select
                        value={marker.markerSize}
                        onChange={(value) =>
                          setMarker(value, index, "markerSize")
                        }
                        options={optionize(["tiny", "small", "mid"])}
                        id={`${index}-marker-size`}
                        fieldSetClassName={styles.sm}
                      />
                    </div>
                  )}
                  <Input
                    value={marker.markerCustom}
                    onChange={(value) =>
                      setMarker(value, index, "markerCustom")
                    }
                    type="text"
                    id={`${index}-marker-custom`}
                    placeholder="Or a custom marker URL (max 64x64)"
                  />

                  {marker.markerCustom && (
                    <Input
                      value={marker.markerShadow}
                      onChange={() =>
                        setMarker(!marker.markerShadow, index, "markerShadow")
                      }
                      label="Marker shadow"
                      type="checkbox"
                      id={`${index}-marker-shadow`}
                    />
                  )}
                </div>
              </div>
            );
          })}
          <div className={styles["form-group"]}>
            <button onClick={() => addMarker()} className={styles["btn"]}>
              <IconPlus /> Add a marker
            </button>
          </div>
        </div>
      </>
    </Wrapper>
  );
}

export default Google;
