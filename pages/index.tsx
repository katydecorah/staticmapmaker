import Meta from "../components/meta";
import providers from "../data/providers";
import styles from "../styles/index.module.scss";
import Title from "../components/title";
import slugify from "../utils/slugify";
import Link from "next/link";
import ViewOnGitHub from "../components/github";

function HomePage() {
  const url = "https://staticmapmaker.com";
  const listOfProviders = providers
    .map(
      (provider, index) =>
        `${index === providers.length - 1 ? "or a " : ""}${provider} static map`
    )
    .join(", ");
  return (
    <>
      <Meta
        title="Static Map Maker"
        url={url}
        description={`Create a ${listOfProviders}. Type in a location, customize the parameters, and get a static map request URL.`}
        image="https://staticmapmaker.com/img/social.png"
        width="800"
        height="494"
      />
      <header className={styles.cover}>
        <Title />
        <ViewOnGitHub />
      </header>
      <main className={styles.providers}>
        {providers.map((provider) => {
          const slug = slugify(provider);
          return (
            <Link key={provider} href={`/${slug}/`} className={styles.provider}>
              <img
                src={`/img/${slug}.png`}
                alt={`${provider} static map API`}
              />
              <div className={styles["provider-title"]}>{provider}</div>
            </Link>
          );
        })}
      </main>
    </>
  );
}

export default HomePage;
