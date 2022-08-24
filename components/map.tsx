import classnames from "classnames";
import styles from "../styles/wrapper.module.scss";
import slugify from "../utils/slugify";

export default function Map({
  API,
  mapcode,
  title,
  location,
  width = 600,
}: {
  API: string | null;
  mapcode: string;
  title: string;
  width: number;
  location: string;
}): JSX.Element {
  const imageSlug = slugify(title);
  return (
    <div className={styles.static}>
      <div
        className={classnames(styles["static-wrapper"], {
          [`${styles["api-required"]}`]: !API,
        })}
      >
        <img
          src={API ? mapcode : `/img/${imageSlug}-placeholder.png`}
          width={width}
          alt={`${title} Map of ${location}`}
          className={styles["static-map"]}
          id="map"
        />
      </div>
      {title === "Mapbox" && (
        <div className={styles.attribution}>
          © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> ©{" "}
          <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
          <strong>
            <a
              href="https://www.mapbox.com/map-feedback/"
              target="_blank"
              rel="noreferrer"
            >
              Improve this map
            </a>
          </strong>
        </div>
      )}
    </div>
  );
}
