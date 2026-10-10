/* eslint-disable @next/next/no-page-custom-font -- fonts are only used by /v2 */
import Head from 'next/head';
import { Contact } from '../../features/v2/ui/Contact';
import { DataTypes } from '../../features/v2/ui/DataTypes';
import { Footer } from '../../features/v2/ui/Footer';
import { Hero } from '../../features/v2/ui/Hero';
import { Process } from '../../features/v2/ui/Process';
import { UseCases } from '../../features/v2/ui/UseCases';
import { Worldwide } from '../../features/v2/ui/Worldwide';
import styles from '../../features/v2/v2.module.css';

const SITE_URL = 'https://kvet.io';
const PAGE_URL = `${SITE_URL}/v2`;
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;
const TITLE = 'Kvetio — Custom AI Training Data Production';
const DESCRIPTION =
  'Custom AI training data for model builders. Kvetio collects, produces, annotates, reviews, and delivers datasets across modalities, domains, and formats.';

export default function V2Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          name='description'
          content={DESCRIPTION}
        />
        <link
          rel='canonical'
          href={PAGE_URL}
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:url'
          content={PAGE_URL}
        />
        <meta
          property='og:title'
          content={TITLE}
        />
        <meta
          property='og:description'
          content={DESCRIPTION}
        />
        <meta
          property='og:image'
          content={OG_IMAGE}
        />
        <meta
          property='og:site_name'
          content='Kvetio'
        />
        <meta
          name='twitter:card'
          content='summary_large_image'
        />
        <link
          rel='icon'
          href='/logo.svg'
          type='image/svg+xml'
        />
        <link
          rel='icon'
          href='/logo.png'
          type='image/png'
        />
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
          href='https://fonts.googleapis.com/css2?family=Cousine:wght@400&family=Inter:wght@400;500;600;700&display=swap'
        />
        <style>{`html, body { margin: 0; background: #fff; }`}</style>
      </Head>
      <div className={styles.root}>
        <Hero />
        <main>
          <UseCases />
          <DataTypes />
          <Process />
          <Worldwide />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
