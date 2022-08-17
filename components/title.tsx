import IconLogo from "./svg/logo";
import styles from "../styles/title.module.scss";

export default function Title({ title }: { title?: string }): JSX.Element {
  return (
    <header className={styles.title}>
      <h1>
        <a href="https://staticmapmaker.com">
          <IconLogo />
          <div>{title || ""} Static Map Maker</div>
        </a>
      </h1>
    </header>
  );
}
