import Head from "next/head";

export default function Meta({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
}): JSX.Element {
  const metaTitle = `${title} | a static map API helper`;
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@katydecorah" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
        </>
      )}
    </Head>
  );
}
