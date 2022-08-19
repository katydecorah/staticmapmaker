import Meta from "../components/meta";
import styles from "../styles/index.module.scss";
import Title from "../components/title";

function CartoDB() {
  const url = "https://staticmapmaker.com/cartodb/";
  const title = "CartoDB";
  return (
    <>
      <Meta
        title={title}
        url={url}
        description="Create a CartoDB static map. Type in a location, customize, and get the map."
      />
      <main className={styles.cover}>
        <Title title={title} />
        <p></p>
        <p>Unavailable.</p>
      </main>
    </>
  );
}

export default CartoDB;
