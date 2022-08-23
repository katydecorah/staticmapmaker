import markerLabels from "../../data/google/marker-labels";
import IconTrash from "../svg/trash";
import IconPlus from "../svg/plus";
import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";
import Select from "../form/select";
import optionize from "../../utils/optionize";

export type Marker = {
  markerSize: string;
  coordinates: string;
  markerLabel: string;
  markerColor: string;
  markerCustom: string;
  markerShadow: string | boolean;
};

export const Markers = ({ markers, addMarker, updateMarker, removeMarker }) => {
  return (
    <div className={stylesForms["fieldset"]}>
      {markers.map((marker: Marker, index: number) => {
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
                onChange={(value) => updateMarker(value, index, "coordinates")}
                placeholder="Address or coordinates"
              />
              {!marker.markerCustom && (
                <div className={styles["flex-column"]}>
                  <Select
                    value={marker.markerLabel}
                    onChange={(value) =>
                      updateMarker(value, index, "markerLabel")
                    }
                    options={optionize(markerLabels)}
                    id={`${index}-marker-label`}
                    fieldSetClassName={styles.sm}
                    disabled={marker.markerSize !== "mid"}
                  />
                  <Input
                    value={marker.markerColor}
                    onChange={(value) =>
                      updateMarker(value, index, "markerColor")
                    }
                    type="color"
                    id={`${index}-marker-color`}
                    fieldSetClassName={styles.sm}
                  />
                  <Select
                    value={marker.markerSize}
                    onChange={(value) =>
                      updateMarker(value, index, "markerSize")
                    }
                    options={[
                      { value: "tiny", text: "small" },
                      { value: "small", text: "medium" },
                      { value: "mid", text: "large" },
                    ]}
                    id={`${index}-marker-size`}
                    fieldSetClassName={styles.sm}
                  />
                </div>
              )}
              <Input
                value={marker.markerCustom}
                onChange={(value) => updateMarker(value, index, "markerCustom")}
                type="text"
                id={`${index}-marker-custom`}
                placeholder="Or a custom marker URL (max 64x64)"
              />

              {marker.markerCustom && (
                <Input
                  value={marker.markerShadow.toString()}
                  onChange={() =>
                    updateMarker(!marker.markerShadow, index, "markerShadow")
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
  );
};

export const buildMarkerRequest = (markers: Marker[]) => {
  const createMarker = (marker: Marker) => {
    const label = marker.markerLabel == "default" ? "" : marker.markerLabel;
    return `&markers=size:${marker.markerSize}%7Ccolor:${marker.markerColor
      .split("#")
      .join("0x")}%7Clabel:${label}%7C${encodeURIComponent(
      marker.coordinates
    )}`;
  };

  const createCustomMarker = (marker: Marker) => {
    return `&markers=icon:${marker.markerCustom}%7Cshadow:${
      marker.markerShadow
    }%7C${encodeURIComponent(marker.coordinates)}`;
  };

  return markers
    .reduce((arr: string[], marker: Marker) => {
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
};
