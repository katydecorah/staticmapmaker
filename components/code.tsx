import { ReactNode, useState } from "react";
import styles from "../styles/code.module.scss";
import Copy from "./copy";

export default function Code({
  children,
}: {
  children: ReactNode;
}): JSX.Element | null {
  const [showCopy, setShowCopy] = useState(false);
  if (!children) return null;
  return (
    <div
      className={styles.code}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <pre>{children}</pre>
      {showCopy && <Copy className={styles.btn} text={children} />}
    </div>
  );
}
