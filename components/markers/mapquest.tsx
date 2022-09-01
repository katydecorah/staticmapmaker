import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";
import AddMarker from "./add-marker";
import RemoveMarker from "./remove-marker";
import Select from "../form/select";
import optionize from "../../utils/optionize";
import markerLabels from "../../data/mapquest/marker-label";

export type Marker = {
  coordinates: string;
  color: string;
  size: string;
  symbol: string;
  type: string;
};

export function buildMarkers(markers: Marker[]) {
  return markers
    .map(({ coordinates, type, color, symbol, size }) => {
      const showColor = `-${color.replace("#", "")}`;
      const showSymbol =
        symbol && type !== "via" ? `-${symbol.toUpperCase()}` : "";
      const showSize = `-${size}`;

      return `${coordinates}|${type}${showColor}${showSymbol}${showSize}`;
    })
    .join("||");
}

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
              <div>
                {marker.type} ({index + 1})
              </div>
              <RemoveMarker removeMarker={removeMarker} index={index} />
            </div>
            <Select
              id={`marker-${index}-type`}
              label="Type"
              value={marker.type}
              onChange={(value) => updateMarker(value, index, "type")}
              options={optionize(["marker", "circle", "via", "flag"])}
            />
            <Input
              id={`marker-${index}-coordinates`}
              type="text"
              label="Location"
              value={marker.coordinates}
              onChange={(value) => updateMarker(value, index, "coordinates")}
              placeholder="Longitude,latitude"
            />
            <Input
              id={`marker-${index}-color`}
              type="color"
              label="Color"
              value={marker.color}
              onChange={(value) => updateMarker(value, index, "color")}
            />
            <Select
              id={`marker-${index}-size`}
              label="Size"
              value={marker.size}
              onChange={(value) => updateMarker(value, index, "size")}
              options={optionize(["sm", "md", "lg"])}
            />
            <Select
              id={`marker-${index}-symbol`}
              label="Symbol"
              value={marker.symbol}
              onChange={(value) => updateMarker(value, index, "symbol")}
              options={optionize(markerLabels)}
              disabled={marker.type === "via"}
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
