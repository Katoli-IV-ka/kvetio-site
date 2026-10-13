import { describe, expect, it } from 'vitest';
import { axisPoint, roundedHexPath, smoothClosedPath } from '../../shared/landing/radar';
import { coverageCopy } from '../../shared/landing/site-content';

describe('coverage radar', () => {
  it('puts the first axis straight up and the fourth straight down', () => {
    expect(axisPoint(300, 300, 100, 0)).toMatchObject({ x: 300, y: 200 });
    expect(axisPoint(300, 300, 100, 3).y).toBeCloseTo(400);
  });

  it('draws closed paths with one rounded corner per vertex', () => {
    const hex = roundedHexPath(300, 300, 190, 30);
    expect(hex.endsWith('Z')).toBe(true);
    expect(hex.match(/Q/g)).toHaveLength(6);
    const shape = smoothClosedPath([0, 1, 2, 3, 4, 5].map((i) => axisPoint(300, 300, 100, i)));
    expect(shape.match(/C/g)).toHaveLength(6);
  });

  it('has one value in 0..1 per axis for every area', () => {
    for (const area of coverageCopy.areas) {
      expect(area.values).toHaveLength(coverageCopy.axes.length);
      for (const value of area.values) expect(value >= 0 && value <= 1).toBe(true);
    }
  });
});
