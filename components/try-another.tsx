import Link from "next/link";
import providers from "../data/providers";
import styles from "../styles/providers.module.scss";
import slugify from "../utils/slugify";
import IconPin from "./svg/pin";

export default function TryAnother({ title }: { title: string }): JSX.Element {
  const filtered = providers.filter((f) => f !== title);
  return (
    <div className={styles["try-another"]}>
      <h2>Try another API</h2>
      <div className={styles["try-another-btn-group"]}>
        {filtered.map((provider) => {
          const slug = slugify(provider);
          return (
            <Link href={`/${slug}/`} key={provider} className={styles.btn}>
              <IconPin /> {provider}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
