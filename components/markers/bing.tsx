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
                max="136"
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
}
