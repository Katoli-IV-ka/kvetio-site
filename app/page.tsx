import { Accuracy } from '@/components/sections/accuracy/Accuracy';
import { DataTypes } from '@/components/sections/data-types/DataTypes';
import { Footer } from '@/components/sections/footer/Footer';
import { Hero } from '@/components/sections/hero/Hero';
import { LinkedIn } from '@/components/sections/linkedin/LinkedIn';
import { Mission } from '@/components/sections/mission/Mission';
import { Statements } from '@/components/sections/statements/Statements';
import { Team } from '@/components/sections/team/Team';
import { siteConfig } from '@/lib/site';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  sameAs: Object.values(siteConfig.social),
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Statements />
        <DataTypes />
        <Team />
        <Mission />
        <Accuracy />
        <LinkedIn />
      </main>
      <Footer />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  );
}
