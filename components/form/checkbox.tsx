import classNames from "classnames";
import styles from "../../styles/forms.module.scss";

export default function Checkbox({
  id,
  value,
  onChange,
  popover,
  label,
  fieldSetClassName,
}: {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
  popover?: string;
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
      {label && (
        <label
          className={styles["checkbox-label"]}
          htmlFor={id}
          data-toggle="popover"
          data-content={popover}
        >
          <input
            type="checkbox"
            checked={value}
            id={id}
            onChange={() => onChange(!value)}
          />
          {label}
        </label>
      )}
    </div>
  );
}
