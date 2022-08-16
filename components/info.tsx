import styles from "../styles/info.module.scss";
import Code from "./code";

export default function Info({
  title,
  mapcode,
  location,
  auto = false,
  width,
  link,
}: {
  title: string;
  mapcode: string;
  location: string;
  auto?: boolean;
  width: number;
  link: string;
}): JSX.Element {
  return (
    <div className={styles.info}>
      <Code>{mapcode}</Code>
      <p>
        Treat the code like an image &mdash; you can use HTML or CSS to display
        it.
      </p>
      {title === "Mapbox" && <MapboxAttribution />}
      <h2>HTML</h2>
      <Code>
        &lt;img width="{width}" src="{mapcode}" alt="
        {`${title} Map ${!auto ? `of ${location}` : ""}`}" /&gt;
      </Code>
      <h2>CSS</h2>
      <Code>background-image: url({mapcode});</Code>
      <h2>How to use</h2>
      <ol>
        <Step title={title} />
        <li>Customize the fields to build your map.</li>
        <li>Copy the generated static API request URL.</li>
        <li>
          Copy and paste the code into your HTML document or a stylesheet.
        </li>
        {title === "Mapbox" && (
          <li>
            <a href="https://www.mapbox.com/help/attribution/">Attribute</a> the
            OpenStreetMap contributors and Mapbox on your website.
          </li>
        )}
      </ol>
      <h2>About</h2>
      <p>
        You can add a static map to any website with simple HTML and no
        JavaScript. Using URL parameters, you can describe the type of map that
        you want and {title} will send it back.
      </p>
      <p>
        The Static Map Maker helps you configure the {title} API parameters and
        gives you the code in real time.
      </p>
      <p>
        Check out <a href={link}>{title}'s static maps API</a>.
      </p>
    </div>
  );
}

function Step({ title }) {
  const specificStep = {
    Mapbox: (
      <li>
        You need a <a href="https://www.mapbox.com/">Mapbox account</a> to
        generate a style URL and to get a public API token.
      </li>
    ),
    Mapquest: (
      <li>
        You'll need to grab your
        <a href="https://developer.mapquest.com/">MapQuest API token</a>.
      </li>
    ),
    Bing: (
      <li>
        You'll need to grab your{" "}
        <a href="https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key">
          Bing Maps Key
        </a>
        .
      </li>
    ),
    Google: (
      <li>
        You must create an{" "}
        <a href="https://developers.google.com/maps/documentation/maps-static/get-api-key#get-an-api-key">
          API Key
        </a>{" "}
        to use Google Static maps
      </li>
    ),
  };

  return specificStep[title] ? specificStep[title] : <></>;
}

function MapboxAttribution() {
  return (
    <p>
      You must{" "}
      <a href="https://www.mapbox.com/help/attribution/">
        attribute Mapbox and OpenStreetMap
      </a>{" "}
      on the page.
    </p>
  );
}
