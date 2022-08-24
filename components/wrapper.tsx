import Info from "./info";
import Meta from "./meta";
import styles from "../styles/wrapper.module.scss";
import Title from "./title";
import Map from "./map";
import { ReactNode } from "react";

type WrapperProps = {
  title: string;
  children: ReactNode;
  API: string | null;
  mapcode: string;
  width: number;
  height: number;
  location: string;
  auto?: boolean;
  link: string;
  apiLink: string;
};

export default function Wrapper(props: WrapperProps): JSX.Element {
  const slug = props.title.split(" ").join("-").toLowerCase();
  const url = `https://staticmapmaker.com/${slug}/`;
  return (
    <>
      <Meta
        title={`${props.title} Static Map Maker`}
        description={`Create a ${props.title} static map with Static Map Maker.`}
        image={`https://staticmapmaker.com/img/${slug}-placeholder.png`}
        url={url}
      />
      <main className={styles.main}>
        <div className={styles["col-left"]}>
          <div className={styles.sticky}>
            <header className={styles.header}>
              <Title title={props.title} />
            </header>
            <div className={styles.controls}>
              <div className={styles.container}>{props.children}</div>
            </div>
          </div>
        </div>
        <div className={styles["col-right"]}>
          <Map {...props} />
          <div className={styles["wrapper"]}>
            <Info {...props} />
          </div>
        </div>
      </main>
    </>
  );
}
