import type { AppProps } from "next/app";
import "../styles/index.scss";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
