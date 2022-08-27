import IconTrash from "../svg/trash";
import styles from "../../styles/providers.module.scss";

export default function RemoveMarker({
  removeMarker,
  index,
}: {
  index: number;
  removeMarker: (index: number) => void;
}) {
  return (
    <button
      aria-label="Remove marker"
      className={styles.btn}
      onClick={() => removeMarker(index)}
    >
      <IconTrash />
    </button>
  );
}
