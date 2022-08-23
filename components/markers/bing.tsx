import { useState } from "react";
import IconTrash from "../svg/trash";
import IconPlus from "../svg/plus";
import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";

export type Marker = {
  style: number;
  coordinates: string;
  label: string;
};

export const Markers = ({ markers, addMarker, updateMarker, removeMarker }) => {
  return (
    <div className={stylesForms["fieldset"]}>
      <div className={styles["form-group"]}>
        {markers.map((marker: Marker, index: number) => {
          return (
            <div className={styles["flex-column"]} key={`marker-${index}`}>
              <Input
                id="coordinates"
                type="text"
                placeholder="coordinates"
                value={marker.coordinates}
                onChange={(value) => updateMarker(value, index, "coordinates")}
              />
              <Input
                id="marker-style"
                type="number"
                min="0"
                max="112"
                placeholder="icon style"
                value={marker.style}
                onChange={(value) => updateMarker(value, index, "style")}
              />
              <Input
                id="marker-label"
                type="text"
                placeholder="label"
                value={marker.label}
                onChange={(value) => updateMarker(value, index, "label")}
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
        style: 64,
        coordinates: "42.6564,-73.7638",
        label: "Hi",
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
