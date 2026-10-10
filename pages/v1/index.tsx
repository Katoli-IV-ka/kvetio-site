import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import {
  bgPage,
  glowPink,
  glowPrimary,
  glowSecondary,
  gradientPage,
} from '../../shared/theme/colors';
import { Header } from '../../widgets/header/ui/Header';
import { Hero } from '../../widgets/hero/ui/Hero';
import { Services } from '../../widgets/services/ui/Services';
import { TrustStrip } from '../../widgets/trust-strip/ui/TrustStrip';
import { DataTypes } from '../../widgets/data-types/ui/DataTypes';
import { SampleDatasets } from '../../widgets/samples/ui/SampleDatasets';
import { Workflow } from '../../widgets/workflow/ui/Workflow';
import { UseCases } from '../../widgets/use-cases/ui/UseCases';
import { WhyUs } from '../../widgets/why-us/ui/WhyUs';
import { QualitySystem } from '../../widgets/quality/ui/QualitySystem';
import { Cta } from '../../widgets/cta/ui/Cta';
import { Footer } from '../../widgets/footer/ui/Footer';

const floatA = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(350px, 200px); }
  50%  { transform: translate(140px, 420px); }
  75%  { transform: translate(-200px, 160px); }
  100% { transform: translate(0px, 0px); }
`;

const floatB = keyframes`
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(-300px, 160px); }
  50%  { transform: translate(-100px, -320px); }
  75%  { transform: translate(220px, -120px); }
  100% { transform: translate(0px, 0px); }
`;

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
        <title>Kvetio — Custom AI Training Data Production</title>
        <meta
          name='description'
          content='Custom AI training data for model builders. Kvetio collects, produces, annotates, reviews, and delivers datasets across modalities, domains, and formats.'
        />
        <meta
          name='robots'
          content='noindex'
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
            background: ${bgPage};
          }
          body {
            overflow-x: hidden;
          }
        `}</style>
      </Head>

      <Box
        minH='100vh'
        bg={gradientPage}
        color='white'
        position='relative'
        overflowX='hidden'
      >
        <Box
          position='fixed'
          inset='0'
          pointerEvents='none'
          zIndex={0}
          opacity={0.28}
          bg='linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)'
          backgroundSize='72px 72px'
          maskImage='linear-gradient(180deg, black, transparent 78%)'
        />
        <Box
          position='fixed'
          top='-220px'
          left='-200px'
          w='620px'
          h='620px'
          bg={glowPrimary}
          pointerEvents='none'
          zIndex={0}
          animation={`${floatA} 12s ease-in-out infinite`}
        />
        <Box
          position='fixed'
          right='-160px'
          top='18%'
          w='560px'
          h='560px'
          bg={glowSecondary}
          pointerEvents='none'
          zIndex={0}
          animation={`${floatB} 15s ease-in-out infinite`}
        />
        <Box
          position='fixed'
          left='40%'
          bottom='-260px'
          w='620px'
          h='620px'
          bg={glowPink}
          pointerEvents='none'
          zIndex={0}
        />

        <Container
          maxW='7xl'
          py={{ base: 4, md: 6 }}
          px={{ base: 5, md: 8 }}
          position='relative'
          zIndex={1}
        >
          <Header />
          <Box
            as='main'
            pt={{ base: 4, md: 6 }}
            pb={{ base: 12, md: 20 }}
          >
            <Hero />
            <TrustStrip />
            <Services />
            <DataTypes />
            <SampleDatasets />
            <Workflow />
            <UseCases />
            <WhyUs />
            <QualitySystem />
          </Box>
          <Cta />
          <Footer />
        </Container>
      </Box>
    </>
  );
}
