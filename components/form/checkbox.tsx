import classNames from "classnames";
import styles from "../../styles/forms.module.scss";

export default function Checkbox({
  id,
  value,
  onChange,
  label,
  fieldSetClassName,
}: {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  fieldSetClassName?: string;
}): JSX.Element {
  return (
    <div
      className={classNames(
        `${styles.fieldset} ${styles["checkbox-fieldset"]}`,
        {
          [`${styles.fieldsetRow}`]: label,
          [`${fieldSetClassName}`]: fieldSetClassName,
        }
      )}
    >
      <input
        type="checkbox"
        checked={value}
        id={id}
        onChange={() => onChange(!value)}
      />
      {label && (
        <label className={styles["checkbox-label"]} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}
