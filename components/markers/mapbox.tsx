import markerLabels from "../../data/mapbox/marker-labels";
import optionize from "../../utils/optionize";
import IconTrash from "../svg/trash";
import IconPlus from "../svg/plus";
import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";
import Select from "../form/select";
import { useState } from "react";

export type Marker = {
  markerSize: string;
  coordinates: string;
  markerLabel: string;
  markerColor: string;
  markerCustom: string;
};

export const Markers = ({ markers, addMarker, updateMarker, removeMarker }) => {
  return (
    <div className={stylesForms["fieldset"]}>
      {markers.length > 0 && (
        <>
          {markers.map((marker: Marker, index: number) => {
            return (
              <div key={`marker-${index}`} className={styles["form-group"]}>
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
                    id={`marker-${index}-coordinates`}
                    type="text"
                    value={marker.coordinates}
                    onChange={(value) =>
                      updateMarker(value, index, "coordinates")
                    }
                    placeholder="Longitude,latitude"
                  />
                  {!marker.markerCustom && (
                    <div className={styles["flex-column"]}>
                      <Select
                        value={marker.markerLabel}
                        onChange={(value) =>
                          updateMarker(value, index, "markerLabel")
                        }
                        options={optionize(markerLabels)}
                        id={`marker-${index}-label`}
                        fieldSetClassName={styles.sm}
                      />
                      <Input
                        value={marker.markerColor}
                        onChange={(value) =>
                          updateMarker(value, index, "markerColor")
                        }
                        type="color"
                        id={`marker-${index}-color`}
                        fieldSetClassName={styles.sm}
                      />
                      <Select
                        value={marker.markerSize}
                        onChange={(value) =>
                          updateMarker(value, index, "markerSize")
                        }
                        options={[
                          { value: "s", text: "small" },
                          { value: "m", text: "medium" },
                          { value: "l", text: "large" },
                        ]}
                        id={`marker-${index}-size`}
                        fieldSetClassName={styles.sm}
                      />
                    </div>
                  )}

                  <Input
                    type="text"
                    placeholder="Or enter a custom marker URL"
                    value={marker.markerCustom}
                    onChange={(value) =>
                      updateMarker(value, index, "markerCustom")
                    }
                    id={`marker-${index}-custom`}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
      <div className={styles["form-group"]}>
        <button onClick={() => addMarker()} className={styles["btn"]}>
          <IconPlus /> Add a marker
        </button>
      </div>
    </div>
  );
};

export const useMarkers = () => {
  const [markers, setMarkers] = useState([]);

  const removeMarker = (index: number) => {
    setMarkers((prevMarkers: Marker[]) =>
      prevMarkers.filter((_, i) => i !== index)
    );
  };

  const addMarker = () => {
    setMarkers((prevMarkers: Marker[]) => [
      ...prevMarkers,
      {
        markerSize: "s",
        coordinates: "-73.7638,42.6564",
        markerLabel: "heart",
        markerColor: "285A98",
        markerCustom: "",
      },
    ]);
  };

  const updateMarker = (
    value: string | boolean,
    index: number,
    label: string
  ) => {
    setMarkers((prevMarkers: Marker[]) =>
      prevMarkers.map((marker, markerIndex) => {
        return {
          ...marker,
          ...(index === markerIndex && { [label]: value }),
        };
      })
    );
  };

  return { markers, addMarker, updateMarker, removeMarker };
};

export const buildMarkerRequest = (markers: Marker[]) => {
  const createPin = ({ coordinates, markerSize, markerLabel, markerColor }) => {
    return `pin-${markerSize}-${markerLabel}+${markerColor
      .split("#")
      .join("")}(${coordinates})`;
  };

  const createCustom = ({ markerCustom, coordinates }) => {
    return `url-${encodeURIComponent(markerCustom)}(${coordinates})`;
  };

  if (markers.length < 1) return "/";
  const set = markers.reduce((arr, marker) => {
    if (marker.coordinates) {
      arr.push(marker.markerCustom ? createCustom(marker) : createPin(marker));
    }
    return arr;
  }, []);
  return `/${set.join(",")}/`;
};
