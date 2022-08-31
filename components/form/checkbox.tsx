import classNames from "classnames";
import styles from "../../styles/forms.module.scss";

export default function Checkbox({
  id,
  value,
  onChange,
  label,
  fieldSetClassName,
  disabled = false,
}: {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  fieldSetClassName?: string;
  disabled?: boolean;
}): JSX.Element {
  return (
    <div
      className={classNames(styles["fieldset-side"], {
        [`${styles.fieldsetRow}`]: label,
        [`${fieldSetClassName}`]: fieldSetClassName,
      })}
    >
      <div className={styles["checkbox-fieldset"]}>
        <input
          type="checkbox"
          checked={value}
          id={id}
          onChange={() => onChange(!value)}
          disabled={disabled}
        />
        {label && (
          <label className={styles["checkbox-label"]} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
}
