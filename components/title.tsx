import IconLogo from "./svg/logo";
import styles from "../styles/title.module.scss";
import Link from "next/link";

export default function Title({ title }: { title?: string }): JSX.Element {
  return (
    <div className={styles.title}>
      <h1>
        <Link href="/">
          <IconLogo />
          <div>{title || ""} Static Map Maker</div>
        </Link>
      </h1>
    </div>
  );
}
