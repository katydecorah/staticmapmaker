import { useState } from "react";
import React, { JSX } from "react";
import styles from "../styles/code.module.scss";
import Copy from "./copy";

export type CodeChildren = React.ReactNode;

export default function Code({
  children,
}: {
  children: CodeChildren;
}): JSX.Element {
  const [showCopy, setShowCopy] = useState(false);
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
