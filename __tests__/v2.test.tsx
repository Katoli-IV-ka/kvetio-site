import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import V2Page, { metadata } from '@/app/v2/page';
import { splitHero } from '@/lib/content';

const html = renderToStaticMarkup(<V2Page />);

describe('alternative design page (/v2)', () => {
  it('renders one h1 with the v2 headline', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain(splitHero.title);
  });

  it('renders navigation, both calls to action and the carousel dots', () => {
    for (const item of splitHero.nav) expect(html).toContain(item);
    expect(html).toContain(splitHero.secondaryCta.label);
    expect(html).toContain(splitHero.primaryCta.label);
    expect(html).toContain('mailto:contact@kvet.io');
    expect(html.match(/aria-hidden="true"/g)?.length).toBeGreaterThanOrEqual(4);
  });

  it('is not indexed and has its own canonical URL', () => {
    expect(metadata.robots).toMatchObject({ index: false });
    expect(metadata.alternates?.canonical).toBe('/v2');
  });
});
