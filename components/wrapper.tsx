import Info from "./info";
import classnames from "classnames";
import Meta from "./meta";
import classNames from "classnames";
import styles from "../styles/wrapper.module.scss";
import Title from "./title";

type WrapperProps = {
  title: string;
  children: any;
  API: string | null;
  mapcode: string;
  width: number;
  height: number;
  location: string;
  auto?: boolean;
  link: string;
};

export default function Wrapper(props: WrapperProps): JSX.Element {
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  const slug = props.title.toLowerCase();
  const url = `https://staticmapmaker.com/${slug}/`;
  return (
    <>
      <Meta
        title={`${props.title} Static Map Maker`}
        description={`Create a ${props.title} static map with Static Map Maker.`}
        image={`https://staticmapmaker.com/img/${slug}.png`}
        url={url}
      />
      <div
        className={classNames(styles.main, {
          //"sidebar-open": sidebarOpen,
          //"sidebar-closed": !sidebarOpen,
        })}
      >
        <div className={styles["col-left"]}>
          <div className={styles.sticky}>
            <div className={styles.header}>
              <Title title={props.title} />
            </div>
            <div className={styles.controls}>
              <div className={styles.container}>{props.children}</div>
            </div>
          </div>
        </div>
        <div className={styles["col-right"]}>
          {/*<Toggle sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <Map {...props} />
          <div className={styles["wrapper"]}>
            <Info {...props} />
          </div>
        </div>
      </div>
    </>
  );
}
/*
function Toggle({ sidebarOpen, setSidebarOpen }): JSX.Element {
  return (
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label={sidebarOpen ? "hide sidebar" : "show sidebar"}
      className={styles.labelToggle}
    >
      {sidebarOpen && <IconMinimize />}
      {!sidebarOpen && <IconMaximize />}
    </button>
  );
}
*/

function Map({
  API,
  mapcode,
  title,
  location,
  width,
}: {
  API: string;
  mapcode: string;
  title: string;
  width: number;
  location: string;
}) {
  return (
    <div className={styles.static}>
      <div
        className={classnames(styles["static-wrapper"], {
          [`${styles["api-required"]}`]: !API,
        })}
      >
        <img
          src={API ? mapcode : `/img/${title.toLowerCase()}-placeholder.png`}
          width={width || "600"}
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
