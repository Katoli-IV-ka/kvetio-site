/* eslint-disable @next/next/no-page-custom-font -- the site fonts are loaded per page */
import Head from 'next/head';
import { BRAND } from '../content';

export const SITE_URL = 'https://kvet.io';
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

type Props = {
  title: string;
  description: string;
  /** page path, '/' for the home page */
  path: string;
  jsonLd?: object[];
};

/** Title, SEO and social tags, fonts and page background shared by the home and solution pages. */
export function SiteHead({ title, description, path, jsonLd }: Props) {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta
        name='description'
        content={description}
      />
      <link
        rel='canonical'
        href={url}
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:url'
        content={url}
      />
      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:description'
        content={description}
      />
      <meta
        property='og:image'
        content={OG_IMAGE}
      />
      <meta
        property='og:site_name'
        content={BRAND}
      />
      <meta
        property='og:locale'
        content='en_US'
      />
      <meta
        name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:title'
        content={title}
      />
      <meta
        name='twitter:description'
        content={description}
      />
      <meta
        name='twitter:image'
        content={OG_IMAGE}
      />
      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <link
        rel='preconnect'
        href='https://fonts.googleapis.com'
      />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin=''
      />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=Cousine:wght@400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap'
      />
      <style>{`html, body { margin: 0; background: #fff; }`}</style>
    </Head>
  );
}
