import Meta from "../components/meta";
import styles from "../styles/index.module.scss";
import Title from "../components/title";

function Yandex() {
  const url = "https://staticmapmaker.com/yandex/";
  const title = "Yandex";
  return (
    <>
      <Meta
        title={title}
        url={url}
        description="Create a Yandex static map. Type in a location, customize, and get the map."
      />
      <main className={styles.cover}>
        <Title title={title} />
        <p></p>
        <p>Unavailable.</p>
      </main>
    </>
  );
}

export default Yandex;
