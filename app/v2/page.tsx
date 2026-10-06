import type { Metadata } from 'next';
import { SplitHero } from '@/components/v2/SplitHero';

export const metadata: Metadata = {
  title: 'Kvetio — Oddly specific AI training data',
  description:
    "We produce training data that doesn't exist yet — for your model only. High-throughput synthesis, pristine edge-case capture, and verified licensing.",
  alternates: { canonical: '/v2' },
  // Alternative design of the same site: keep it out of search results so it does not compete with "/".
  robots: { index: false, follow: true },
};

export default function V2Page() {
  return (
    <main>
      <SplitHero />
    </main>
  );
}
