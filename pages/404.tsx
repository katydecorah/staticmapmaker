import Meta from "../components/meta";
import styles from "../styles/index.module.scss";
import Title from "../components/title";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/router";

export default function Custom404() {
  const { asPath } = useRouter();
  Sentry.withScope(() => {
    Sentry.setTag("404", true);
    Sentry.captureException(`404: ${asPath}`);
  });
  return (
    <>
      <Meta
        title="404"
        url=""
        description={`404`}
        image="https://staticmapmaker.com/img/social.png"
        width="800"
        height="494"
      />
      <header className={styles.cover}>
        <Title title="404 Page not found | " />
      </header>
    </>
  );
}
