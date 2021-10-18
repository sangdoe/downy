import { NextPage } from "next";

import Head from "next/head";

interface HeadProps {
  title: string;
  currentUrl?: string;
  keywords: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

const HeadMeta: NextPage<HeadProps> = ({
  title,
  currentUrl,
  keywords,
  description,
  imageUrl,
  url,
}) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta
        name="google-site-verification"
        content="cKAxxV957zun9sdnWBdxBHxaD78VO2PbbUo5id_ylLg"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="apple-mobile-web-app-title" content="DOWNY" />
      <meta name="application-name" content="DOWNY" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="theme-color" content="#ffffff"></meta>
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="twitter:image" content={imageUrl} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </>
      )}
      <link rel="icon" href="/favicon.ico" />
      <meta name="robots" content="all" />
      <meta property="og:site_name" content="Downy" />
      <meta property="og:url" content={currentUrl} />
      <link rel="canonical" href={currentUrl} />
      <meta property="og:type" content="website" />
      <meta name="author" content="AFzal Saiyed" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords}></meta>
      <meta name="description" content={description} />
      <meta name="twitter:domain" content="corecare.in" />
      <meta name="twitter:site" content="@mastur.plb" />
      <meta name="twitter:creator" content="@mastur.fyc" />
      <meta
        name="twitter:title"
        property="og:title"
        itemProp="name"
        content={title}
      />
      <meta
        name="twitter:description"
        property="og:description"
        itemProp="description"
        content={description}
      />
      <title>{title}</title>
    </Head>
  );
};

export default HeadMeta;
