import classNames from "classnames";
import styles from "../../styles/forms.module.scss";

export default function Select({
  id,
  value,
  label,
  options,
  onChange,
  fieldSetClassName = "",
  disabled,
}: {
  id: string;
  value: string | number;
  options: { text: string; value: string }[];
  onChange: (e: any) => void;
  label?: string;
  fieldSetClassName?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={classNames(`${styles.fieldset} ${fieldSetClassName}`, {
        [`${styles["fieldset-row"]}`]: label,
      })}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <select
        value={value}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
