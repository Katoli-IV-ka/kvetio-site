import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { ink } from '../../shared/theme/palette';
import { Intro } from '../../widgets/intro/ui/Intro';
import { Cases } from '../../widgets/cases/ui/Cases';
import { Accuracy } from '../../widgets/accuracy/ui/Accuracy';
import { Pillars } from '../../widgets/pillars/ui/Pillars';
import { Team } from '../../widgets/team/ui/Team';
import { Modalities } from '../../widgets/modalities/ui/Modalities';
import { Network } from '../../widgets/network/ui/Network';
import { LinkedInCard } from '../../widgets/linkedin/ui/LinkedInCard';
import { SiteFooter } from '../../widgets/contact-band/ui/SiteFooter';
import { ContactBand } from '../../widgets/contact-band/ui/ContactBand';

const SITE_URL = 'https://kvet.io';
const PAGE_URL = `${SITE_URL}/v1`;
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kvetio',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: 'contact@kvet.io',
  sameAs: ['https://www.instagram.com/kvetio', 'https://www.linkedin.com/company/kvet-io'],
  description:
    'Kvetio produces, collects, annotates, and delivers custom datasets across data types and domains for AI model training.',
};

export default function HomePage() {
  return (
    <>
      <Head>
        <meta
          name='robots'
          content='noindex'
        />
        <title>Kvetio — Custom AI Training Data Production</title>
        <meta
          name='description'
          content='Custom AI training data for model builders. Kvetio collects, produces, annotates, reviews, and delivers datasets across modalities, domains, and formats.'
        />
        <link
          rel='canonical'
          href={PAGE_URL}
        />

        {/* Open Graph */}
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
          content='Kvetio — Custom AI Training Data Production'
        />
        <meta
          property='og:description'
          content='Training datasets collected, produced, annotated, reviewed, and delivered in your format.'
        />
        <meta
          property='og:image'
          content={OG_IMAGE}
        />
        <meta
          property='og:image:width'
          content='1200'
        />
        <meta
          property='og:image:height'
          content='630'
        />
        <meta
          property='og:site_name'
          content='Kvetio'
        />

        {/* Twitter Card */}
        <meta
          name='twitter:card'
          content='summary_large_image'
        />
        <meta
          name='twitter:title'
          content='Kvetio — Custom AI Training Data Production'
        />
        <meta
          name='twitter:description'
          content='Training datasets collected, produced, annotated, reviewed, and delivered in your format.'
        />
        <meta
          name='twitter:image'
          content={OG_IMAGE}
        />

        {/* JSON-LD */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`
          html,
          body,
          #__next {
            min-height: 100%;
            background: ${ink};
          }
          body {
            overflow-x: hidden;
          }
        `}</style>
      </Head>

      <Box
        minH='100vh'
        bg={ink}
        color='white'
        fontFamily="'Inter', system-ui, sans-serif"
        overflowX='hidden'
      >
        <Intro />
        <main>
          <Cases />
          <Team />
          <ContactBand />
          <Modalities />
          <Pillars />
          <LinkedInCard />
          <Accuracy />
          <Network />
        </main>
        <SiteFooter />
      </Box>
    </>
  );
}
