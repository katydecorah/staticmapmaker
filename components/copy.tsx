import React, { useState } from "react";
import IconCheck from "./svg/check";
import IconCopy from "./svg/copy";
import IconAlert from "./svg/alert";
import { CodeChildren } from "./code";

export default function Copy({
  text,
  className,
}: {
  text: CodeChildren;
  className?: string;
}): JSX.Element {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  const pickIcon = () => {
    if (copySuccess) return <IconCheck />;
    if (copySuccess === "Failed to copy!") return <IconAlert />;
    return <IconCopy />;
  };

  return (
    <button
      aria-label="Copy code"
      className={className}
      onClick={() => copyToClipBoard(text.toString())}
    >
      {pickIcon()}
    </button>
  );
}
