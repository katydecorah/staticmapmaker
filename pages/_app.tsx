import type { AppProps } from "next/app";
import "../styles/index.scss";
import React, { JSX } from "react";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
