import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { cities, modalityCopy, pillarCopy, useCaseCards } from '../../shared/landing/site-content';

describe('redesigned landing content', () => {
  it('has nine use-case cards whose photos exist in public/images/v2', () => {
    expect(useCaseCards).toHaveLength(9);
    for (const card of useCaseCards) {
      expect(existsSync(join(process.cwd(), 'public/images/v2', `${card.image}.jpg`))).toBe(true);
    }
  });

  it('marks the eight network cities on the map', () => {
    expect(cities.map((city) => city.name).sort()).toEqual(
      ['Berlin', 'Dubai', 'Madrid', 'Minsk', 'New York', 'Prague', 'Tokyo', 'Warsaw'].sort(),
    );
  });

  it('keeps the five data modalities and the three pillars', () => {
    expect(modalityCopy.rows).toHaveLength(5);
    expect(Object.keys(pillarCopy)).toEqual(['proprietary', 'anyData', 'rights']);
  });
});
