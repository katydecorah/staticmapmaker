import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";
import AddMarker from "./add-marker";
import RemoveMarker from "./remove-marker";

export type Marker = {
  style: number;
  coordinates: string;
  label: string;
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
              Pushpin ({index + 1})
              <RemoveMarker removeMarker={removeMarker} index={index} />
            </div>
            <Input
              id="coordinates"
              type="text"
              label="Coordinates"
              placeholder="coordinates"
              value={marker.coordinates}
              onChange={(value) => updateMarker(value, index, "coordinates")}
            />
            <Input
              id="marker-style"
              type="number"
              min="0"
              max="136"
              label="Style"
              placeholder="icon style"
              value={marker.style}
              onChange={(value) => updateMarker(value, index, "style")}
            />
            <Input
              id="marker-label"
              type="text"
              label="Label"
              placeholder="label"
              value={marker.label}
              onChange={(value) => updateMarker(value, index, "label")}
            />
          </div>
        );
      })}
      <div className={stylesForms["fieldset-side"]}>
        <AddMarker label="pushpin" addMarker={addMarker} />
      </div>
    </>
  );
}
