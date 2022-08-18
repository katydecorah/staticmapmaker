import classNames from "classnames";
import styles from "../../styles/forms.module.scss";

export default function Input({
  id,
  value,
  label,
  type,
  placeholder,
  min,
  max,
  onChange,
  step,
  fieldSetClassName = "",
  disabled = false,
}: {
  id: string;
  value: string | number;
  onChange: (e: any) => void;
  type: string;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  label?: string;
  step?: string | number;
  fieldSetClassName?: string;
  disabled?: boolean;
}): JSX.Element {
  const inputProps = {
    min,
    max,
    step,
  };

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
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...inputProps}
        disabled={disabled}
      />
    </div>
  );
}
