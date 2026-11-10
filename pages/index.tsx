import { BRAND, FAQ } from '../features/v2/content';
import { Capabilities } from '../features/v2/ui/Capabilities';
import { Contact } from '../features/v2/ui/Contact';
import { CreativeWorkflow } from '../features/v2/ui/CreativeWorkflow';
import { DatasetPatterns } from '../features/v2/ui/DatasetPatterns';
import { Faq } from '../features/v2/ui/Faq';
import { Footer } from '../features/v2/ui/Footer';
import { Header } from '../features/v2/ui/Header';
import { Hero } from '../features/v2/ui/Hero';
import { Infrastructure } from '../features/v2/ui/Infrastructure';
import { MobileMenu } from '../features/v2/ui/MobileMenu';
import { Process } from '../features/v2/ui/Process';
import { SITE_URL, SiteHead } from '../features/v2/ui/SiteHead';
import { WhatWeDo } from '../features/v2/ui/WhatWeDo';
import { WhyKvet } from '../features/v2/ui/WhyKvet';
import styles from '../features/v2/v2.module.css';

const TITLE = `${BRAND} — Custom Real-World Data Production for AI`;
const DESCRIPTION = `Your model needs data that doesn't exist yet. ${BRAND} produces it: custom datasets built around your model's requirements — controlled visual production, global data collection, multimodal capture and Physical AI.`;

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: 'contact@kvet.io',
    sameAs: ['https://www.instagram.com/kvetio', 'https://www.linkedin.com/company/kvet-io'],
    description: DESCRIPTION,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND,
    url: SITE_URL,
    description: DESCRIPTION,
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHead
        title={TITLE}
        description={DESCRIPTION}
        path='/'
        jsonLd={JSON_LD}
      />
      <div className={styles.root}>
        <MobileMenu />
        <Header />
        <Hero />
        <main>
          <Capabilities />
          <WhatWeDo />
          <DatasetPatterns />
          <CreativeWorkflow />
          <Infrastructure />
          <Process white />
          <Contact />
          <WhyKvet />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  );
}
