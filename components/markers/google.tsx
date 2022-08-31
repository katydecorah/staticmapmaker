import markerLabels from "../../data/google/marker-labels";
import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";
import Select from "../form/select";
import optionize from "../../utils/optionize";
import AddMarker from "./add-marker";
import RemoveMarker from "./remove-marker";
import markerSizes from "../../data/google/marker-sizes";

export type Marker = {
  markerSize: string;
  coordinates: string;
  markerLabel: string;
  markerColor: string;
  markerCustom: string;
  markerShadow: string | boolean;
};

export function Markers({
  markers,
  addMarker,
  updateMarker,
  removeMarker,
}: {
  markers: Marker[];
  addMarker: () => void;
  updateMarker: (
    value: string | boolean,
    index: number,
    label: keyof Marker
  ) => void;
  removeMarker: (index: number) => void;
}): JSX.Element {
  return (
    <>
      {markers.map((marker: Marker, index: number) => {
        return (
          <div key={`${index}-marker`} className={stylesForms["fieldset-side"]}>
            <div className={styles["marker-title"]}>
              <div>Marker ({index + 1})</div>
              <RemoveMarker removeMarker={removeMarker} index={index} />
            </div>
            <Input
              id={`${index}-marker-coordinates`}
              type="text"
              label="Coordinates"
              value={marker.coordinates}
              onChange={(value) => updateMarker(value, index, "coordinates")}
              placeholder="Address or coordinates"
            />
            {!marker.markerCustom && (
              <>
                <Select
                  value={marker.markerLabel}
                  label="Label"
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
                  label="Color"
                  onChange={(value) =>
                    updateMarker(value, index, "markerColor")
                  }
                  type="color"
                  id={`${index}-marker-color`}
                  fieldSetClassName={styles.sm}
                />
                <Select
                  value={marker.markerSize}
                  label="Size"
                  onChange={(value) => updateMarker(value, index, "markerSize")}
                  options={markerSizes}
                  id={`${index}-marker-size`}
                  fieldSetClassName={styles.sm}
                />
              </>
            )}
            <Input
              value={marker.markerCustom}
              label="Custom"
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
        );
      })}
      <div className={stylesForms["fieldset-side"]}>
        <AddMarker addMarker={addMarker} />
      </div>
    </>
  );
}

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
