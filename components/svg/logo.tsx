import styles from "../../styles/icons.module.scss";

export default function IconLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      data-icon="map"
      viewBox="0 0 128 128"
      className={styles["header-icon"]}
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <path d="M5.5 0C2.367 0 0 2.367 0 5.5v117c0 3.133 2.367 5.5 5.5 5.5h117c3.133 0 5.5-2.367 5.5-5.5V5.5c0-3.133-2.367-5.5-5.5-5.5H5.5zM8 8h112v112H8V8zm35.188 2l15 15-9.594 9.594a2 2 0 1 0 2.813 2.813L61 27.813 101.19 68l-50.032 50h5.688l47.156-47.187 14 14v-5.625L106.814 68l11.188-11.188v-5.625l-14 14L63.814 25l15-15H73.19L61 22.186 48.814 10h-5.625zM48 52c-8.8 0-16 7.2-16 16 0 12 16 32 16 32s16-20 16-32c0-8.8-7.2-16-16-16zm0 8c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z" />
    </svg>
  );
}
