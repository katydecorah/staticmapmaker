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
    <div className={stylesForms["fieldset"]}>
      {markers.length > 0 && (
        <>
          {markers.map((marker: Marker, index: number) => {
            return (
              <div key={`marker-${index}`} className={styles["form-group"]}>
                <div className={styles["marker-title"]}>
                  <div>
                    Marker {marker.coordinates} ({index + 1})
                  </div>
                  <RemoveMarker removeMarker={removeMarker} index={index} />
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
                </div>
              </div>
            );
          })}
        </>
      )}
      <AddMarker addMarker={addMarker} />
    </div>
  );
}
