import IconTrash from "../svg/trash";
import IconPlus from "../svg/plus";
import styles from "../../styles/providers.module.scss";
import stylesForms from "../../styles/forms.module.scss";
import Input from "../form/input";

export type Leg = {
  index: number;
  location: string;
};

export function Routes({
  route,
  addRoute,
  updateRoute,
  removeRoute,
}: {
  route: Leg[];
  addRoute: () => void;
  updateRoute: (value: string, index: number, label: keyof Leg) => void;
  removeRoute: () => void;
}): JSX.Element {
  return (
    <div className={stylesForms["fieldset"]}>
      {route.length > 0 &&
        route.map((leg, index) => (
          <Input
            id={`leg-${index}`}
            key={`leg-${index}`}
            type="text"
            label={index === 0 ? "From" : "To"}
            onChange={(value) => updateRoute(value, index, "location")}
            value={leg.location}
          />
        ))}
      <div className={styles["form-group"]}>
        {route.length === 0 ? (
          <button onClick={addRoute} className={styles.btn}>
            <IconPlus /> Add route
          </button>
        ) : (
          <button onClick={removeRoute} className={styles.btn}>
            <IconTrash /> Remove route
          </button>
        )}
      </div>
    </div>
  );
}
