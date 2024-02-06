import Meta from "../components/meta";
import styles from "../styles/index.module.scss";
import Title from "../components/title";

export default function Custom404() {
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
