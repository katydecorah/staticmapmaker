import Meta from "../components/meta";
import providers from "../data/providers";
import styles from "../styles/index.module.scss";
import Title from "../components/title";

function HomePage() {
  const url = "https://staticmapmaker.com";
  return (
    <>
      <Meta
        title="Static Map Maker"
        url={url}
        description="Create a Bing static map, Google static map, Mapbox static map, MapQuest static map, a HERE static map, a CartoDB static map, or a Yandex static map. Type in a location, customize, and get the map."
      />
      <div className={styles.cover}>
        <Title />
      </div>
      <div className={styles.providers}>
        {providers.map((provider) => {
          return (
            <a
              key={provider}
              href={`/${provider.toLowerCase()}/`}
              className={styles.provider}
            >
              <img
                src={`/img/${provider.toLowerCase()}.png`}
                alt={`${provider} static map API`}
              />

              <div className={styles["provider-title"]}>{provider}</div>
            </a>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
