import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { ink } from '../shared/theme/palette';
import { Intro } from '../widgets/intro/ui/Intro';
import { Cases } from '../widgets/cases/ui/Cases';
import { Accuracy } from '../widgets/accuracy/ui/Accuracy';
import { Pillars } from '../widgets/pillars/ui/Pillars';
import { Team } from '../widgets/team/ui/Team';
import { Modalities } from '../widgets/modalities/ui/Modalities';
import { Network } from '../widgets/network/ui/Network';
import { LinkedInCard } from '../widgets/linkedin/ui/LinkedInCard';
import { SiteFooter } from '../widgets/contact-band/ui/SiteFooter';
import { ContactBand } from '../widgets/contact-band/ui/ContactBand';

const SITE_URL = 'https://kvet.io';
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

function PreviewLabel({ text }: { text: string }) {
  return (
    <Box
      bg='#000'
      px={{ base: 5, md: 16 }}
      pt={6}
      fontFamily='monospace'
      fontSize='11px'
      letterSpacing='0.08em'
      textTransform='uppercase'
      color='#8b93a3'
    >
      {text}
    </Box>
  );
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Kvetio — Custom AI Training Data Production</title>
        <meta
          name='description'
          content='Custom AI training data for model builders. Kvetio collects, produces, annotates, reviews, and delivers datasets across modalities, domains, and formats.'
        />
        <link
          rel='canonical'
          href={SITE_URL}
        />

        {/* Open Graph */}
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:url'
          content={SITE_URL}
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

        {/* Icons */}
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
          rel='apple-touch-icon'
          href='/logo.png'
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
          <Pillars />
          <Team />
          {/* Preview of three Contact Us designs, one under another; the chosen one stays. */}
          <PreviewLabel text='Variant 1 — sky photo' />
          <ContactBand variant='sky' />
          <PreviewLabel text='Variant 2 — hands photo' />
          <ContactBand
            variant='hands'
            idPrefix='b'
          />
          <PreviewLabel text='Variant 3 — black, hands in the button' />
          <ContactBand
            variant='button'
            idPrefix='c'
          />
          <Cases />
          <LinkedInCard />
          <Accuracy />
          <Modalities />
          <Network />
        </main>
        <SiteFooter />
      </Box>
    </>
  );
}
