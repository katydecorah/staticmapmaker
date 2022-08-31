import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";
import AddMarker from "./add-marker";
import RemoveMarker from "./remove-marker";

export type Marker = {
  coordinates: string;
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
            <div className={styles["flex-column"]}>
              <Input
                id={`marker-${index}-coordinates`}
                type="text"
                label={`Marker (${index + 1})`}
                value={marker.coordinates}
                onChange={(value) => updateMarker(value, index, "coordinates")}
                placeholder="Longitude,latitude"
              />
              <RemoveMarker removeMarker={removeMarker} index={index} />
            </div>
          </div>
        );
      })}
      <div className={stylesForms["fieldset-side"]}>
        <AddMarker addMarker={addMarker} />
      </div>
    </>
  );
}
