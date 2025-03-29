import IconPlus from "../svg/plus";
import styles from "../../styles/providers.module.scss";
import React, { JSX } from "react";

export default function AddMarker({
  label = "marker",
  addMarker,
}: {
  label?: string;
  addMarker: () => void;
}): JSX.Element {
  return (
    <button onClick={addMarker} className={styles.btn}>
      <IconPlus /> Add a {label}
    </button>
  );
}
