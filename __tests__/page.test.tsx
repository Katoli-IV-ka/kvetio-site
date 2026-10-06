import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';
import { hero, linkedin } from '@/lib/content';

const html = renderToStaticMarkup(<HomePage />);

describe('home page markup', () => {
  it('renders exactly one h1 with the hero headline', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain(hero.title);
  });

  it('renders the landmarks and every section heading', () => {
    expect(html).toContain('<main');
    expect(html).toContain('<footer');
    for (const heading of [
      'Data types',
      'Production-first data team',
      'Data for Final AI Accuracy',
      linkedin.title,
    ]) {
      expect(html).toContain(heading);
    }
  });

  it('links the LinkedIn actions to the company page safely', () => {
    const links = html.match(/<a [^>]*linkedin\.com\/company\/kvet-io[^>]*>/g) ?? [];
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toContain('rel="noopener noreferrer"');
      expect(link).toContain('target="_blank"');
    }
  });

  it('embeds Organization structured data', () => {
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type":"Organization"');
  });

  it('keeps decorative photos out of the accessibility tree', () => {
    const decorative = html.match(/<img[^>]*alt=""[^>]*>/g) ?? [];
    expect(decorative.length).toBeGreaterThanOrEqual(7);
  });
});
