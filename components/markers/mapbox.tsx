import markerLabels from "../../data/mapbox/marker-labels";
import optionize from "../../utils/optionize";
import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";
import Select from "../form/select";
import AddMarker from "./add-marker";
import RemoveMarker from "./remove-marker";
import markerSizes from "../../data/mapbox/marker-size";

export type Marker = {
  markerSize: string;
  coordinates: string;
  markerLabel: string;
  markerColor: string;
  markerCustom: string;
};

export function Markers({
  markers,
  addMarker,
  updateMarker,
  removeMarker,
}: {
  markers: Marker[];
  addMarker: () => void;
  updateMarker: (value: string, index: number, label: keyof Marker) => void;
  removeMarker: (index: number) => void;
}): JSX.Element {
  return (
    <>
      {markers.map((marker: Marker, index: number) => {
        return (
          <div key={`marker-${index}`} className={stylesForms["fieldset-side"]}>
            <div className={styles["marker-title"]}>
              <div>Marker ({index + 1})</div>
              <RemoveMarker removeMarker={removeMarker} index={index} />
            </div>
            <Input
              id={`marker-${index}-coordinates`}
              type="text"
              value={marker.coordinates}
              label="Coordinates"
              onChange={(value) => updateMarker(value, index, "coordinates")}
              placeholder="Longitude,latitude"
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
                  id={`marker-${index}-label`}
                  fieldSetClassName={styles.sm}
                />
                <Input
                  value={marker.markerColor}
                  label="Color"
                  onChange={(value) =>
                    updateMarker(value, index, "markerColor")
                  }
                  type="color"
                  id={`marker-${index}-color`}
                  fieldSetClassName={styles.sm}
                />
                <Select
                  value={marker.markerSize}
                  label="Size"
                  onChange={(value) => updateMarker(value, index, "markerSize")}
                  options={markerSizes}
                  id={`marker-${index}-size`}
                  fieldSetClassName={styles.sm}
                />
              </>
            )}

            <Input
              type="text"
              placeholder="Or enter a custom marker URL"
              label="Custom"
              value={marker.markerCustom}
              onChange={(value) => updateMarker(value, index, "markerCustom")}
              id={`marker-${index}-custom`}
            />
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
  const createPin = ({
    coordinates,
    markerSize,
    markerLabel,
    markerColor,
  }: Marker) => {
    return `pin-${markerSize}-${markerLabel}+${markerColor
      .split("#")
      .join("")}(${coordinates})`;
  };

  const createCustom = ({ markerCustom, coordinates }: Marker) => {
    return `url-${encodeURIComponent(markerCustom)}(${coordinates})`;
  };

  if (markers.length < 1) return "/";
  const set = markers.map((marker) =>
    marker.markerCustom ? createCustom(marker) : createPin(marker)
  );
  return `/${set.join(",")}/`;
};
