import { BRAND } from '../features/v2/content';
import { Capabilities } from '../features/v2/ui/Capabilities';
import { Contact } from '../features/v2/ui/Contact';
import { Footer } from '../features/v2/ui/Footer';
import { Header } from '../features/v2/ui/Header';
import { Hero } from '../features/v2/ui/Hero';
import { Infrastructure } from '../features/v2/ui/Infrastructure';
import { LinkedIn } from '../features/v2/ui/LinkedIn';
import { MobileMenu } from '../features/v2/ui/MobileMenu';
import { Process } from '../features/v2/ui/Process';
import { SITE_URL, SiteHead } from '../features/v2/ui/SiteHead';
import { WhatWeDo } from '../features/v2/ui/WhatWeDo';
import { WhyKvet } from '../features/v2/ui/WhyKvet';
import styles from '../features/v2/v2.module.css';

const TITLE = `${BRAND} — Custom Data Production for AI`;
const DESCRIPTION = `${BRAND} designs and produces custom datasets for AI — visual, multimodal and Physical AI data built around your model's requirements, from research pilots to global production at scale.`;

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
          {/* Data we produce (DatasetPatterns) is hidden until the block is rebuilt */}
          <Infrastructure />
          <Process />
          <Contact />
          <WhyKvet />
          <LinkedIn />
        </main>
        <Footer />
      </div>
    </>
  );
}
