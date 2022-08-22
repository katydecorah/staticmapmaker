import styles from "../styles/info.module.scss";
import Code from "./code";

export default function Info({
  title,
  mapcode,
  location,
  auto = false,
  width,
  link,
  apiLink,
}: {
  title: string;
  mapcode: string;
  location: string;
  auto?: boolean;
  width: number;
  link: string;
  apiLink: string;
}): JSX.Element {
  return (
    <div className={styles.info}>
      <h2>Request</h2>
      <Code>{mapcode}</Code>
      Display the map as an image:
      <Code>
        &lt;img width="{width}" src="{mapcode}" alt="
        {`${title} map ${!auto ? `of ${location}` : ""}`}" /&gt;
      </Code>
      Display the map as a CSS background image:
      <Code>background-image: url({mapcode});</Code>
      <h2>How to use</h2>
      <ol>
        <li>
          Get a <a href={apiLink}>{title} API key</a>.
        </li>
        <li>Customize the fields to build your map.</li>
        <li>
          Copy and paste the generated code into your HTML document or a
          stylesheet.
        </li>
      </ol>
      <h2>About</h2>
      <p>
        You can add a static map to any website with simple HTML and no
        JavaScript. Using URL parameters, you can describe the type of map that
        you want and {title} will send it back.
      </p>
      <p>
        The Static Map Maker helps you configure the {title} API parameters.
      </p>
      <p>
        Check out <a href={link}>{title}'s static maps API</a>.
      </p>
    </div>
  );
}
