import { describe, expect, it } from 'vitest';
import {
  accuracy,
  dataTypes,
  footer,
  hero,
  linkedin,
  mission,
  statements,
  team,
} from '@/lib/content';

describe('landing copy (Figma frame "New site")', () => {
  it('keeps the hero headline and subtitle', () => {
    expect(hero.title).toBe('Oddly specific training data');
    expect(hero.subtitle).toBe(
      "We shoot training data that doesn't exist yet — for your model only.",
    );
  });

  it('has the three statement cards', () => {
    expect(statements.capture.title).toContain('We produce it.');
    expect(statements.anyData.primary).toBe('Any format.');
    expect(statements.anyData.secondary).toBe('Any industry.');
    expect(statements.rights.title).toBe('Rights-ready');
  });

  it('lists the four data types in design order', () => {
    expect(dataTypes.items.map((item) => item.title)).toEqual([
      'Visual Data',
      'Text & Documents',
      'Sensor & Telemetry',
      'Domain-Specific Data',
    ]);
  });

  it('keeps team, mission and accuracy messaging', () => {
    expect(team.title).toBe('Production-first data team');
    expect(mission.title.startsWith('Too specific to find.')).toBe(true);
    expect(accuracy.title).toBe('Data for Final AI Accuracy');
    expect(accuracy.stages).toHaveLength(3);
    expect(accuracy.legend.map((entry) => entry.tone)).toEqual(['blue', 'amber']);
  });

  it('describes the LinkedIn card and footer', () => {
    expect(linkedin.company).toBe('kvet.io');
    expect(linkedin.actions).toEqual({ follow: 'Follow', message: 'Message' });
    expect(footer.links.map((link) => link.label)).toEqual([
      'Datasets',
      'Research',
      'Protocols',
      'Privacy',
    ]);
  });
});
