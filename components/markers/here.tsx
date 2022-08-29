import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";
import AddMarker from "./add-marker";
import RemoveMarker from "./remove-marker";
import Select from "../form/select";
import poiLabels from "../../data/here/poi-labels";
import poiThemes from "../../data/here/poi-themes";

export type Marker = {
  coordinates: string;
};

export function Markers({
  markers,
  addMarker,
  updateMarker,
  removeMarker,
  markerColor,
  setMarkerColor,
  markerLabel,
  setMarkerLabel,
  markerTheme,
  setMarkerTheme,
}: {
  markers: Marker[];
  addMarker: () => void;
  updateMarker: (value: string, index: number, label: keyof Marker) => void;
  removeMarker: (index: number) => void;
  markerColor: string;
  setMarkerColor: (value: string) => void;
  markerLabel: string;
  setMarkerLabel: (value: string) => void;
  markerTheme: string;
  setMarkerTheme: (value: string) => void;
}): JSX.Element {
  return (
    <div className={stylesForms["fieldset"]}>
      {markers.length > 0 && (
        <>
          <div className={styles["form-group"]}>
            <strong>POIs</strong>
          </div>
          <Input
            id="poi-color"
            value={markerColor}
            onChange={setMarkerColor}
            type="color"
            label="POI color"
          />
          <Select
            id="poi-label"
            value={markerLabel}
            onChange={setMarkerLabel}
            label="POI label"
            options={poiLabels}
          />
          <Select
            id="poi-theme"
            value={markerTheme}
            onChange={setMarkerTheme}
            label="POI theme"
            options={poiThemes}
          />
          <div className={styles["form-group"]}>
            {markers.map((marker: Marker, index: number) => {
              return (
                <div className={styles["flex-column"]} key={`marker-${index}`}>
                  <Input
                    id={`poi-coordinates-${index}`}
                    type="text"
                    placeholder="coordinates"
                    value={marker.coordinates}
                    onChange={(value) =>
                      updateMarker(value, index, "coordinates")
                    }
                  />
                  <RemoveMarker removeMarker={removeMarker} index={index} />
                </div>
              );
            })}
          </div>
        </>
      )}
      <AddMarker label="POI" addMarker={addMarker} />
    </div>
  );
}
