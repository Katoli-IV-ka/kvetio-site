/**
 * All copy of the landing page, exactly as it is written in the Figma frame "New site".
 * Sections import their text from here so wording changes never touch markup.
 */

export const hero = {
  title: 'Oddly specific training data',
  subtitle: "We shoot training data that doesn't exist yet — for your model only.",
} as const;

export const statements = {
  capture: {
    eyebrow: 'Proprietary capture',
    title: "Your model needs data that doesn't exist yet. We produce it.",
  },
  anyData: {
    eyebrow: 'Any data type',
    primary: 'Any format.',
    secondary: 'Any industry.',
    body: "Photo and video are key use cases for us, but we don't limit ourselves to one data type or one industry. Audio, text, sensor, and domain-specific data: the workflow is built around your requirements, not around what we already have.",
  },
  rights: {
    title: 'Rights-ready',
    body: 'Data produced for you meets your legal and technical requirements, exactly as written in your brief.',
  },
} as const;

export const dataTypes = {
  title: 'Data types',
  items: [
    {
      title: 'Visual Data',
      description:
        'Multi-angle frames, scene capture, tailored visual annotations & object detection.',
    },
    {
      title: 'Text & Documents',
      description: 'Instructions, classification sets, structured schema, OCR & domain prompts.',
    },
    {
      title: 'Sensor & Telemetry',
      description: 'Device logs, tabular streams, scenario attributes & spatial telemetry.',
    },
    {
      title: 'Domain-Specific Data',
      description: 'Robotics, healthcare, industrial setups, safety & rare edge-case operations.',
    },
  ],
} as const;

export const team = {
  title: 'Production-first data team',
  body: 'We are a full—service visual production Company. Initially, we professionally created high-quality photo and video content for leading marketplaces and brands.',
} as const;

export const mission = {
  title:
    "Too specific to find. We shoot training data that doesn't exist yet — for your model only.",
} as const;

export const accuracy = {
  title: 'Data for Final AI Accuracy',
  body: 'The smarter the model, the harder it is to find fine-tuning data. Standard datasets no longer work, and creating rare cases in-house is too expensive. We deliver unique, ready-to-use edge cases that cannot be found in the wild.',
  stages: ['Early stages', 'Plateau', 'Production ready'],
  legend: [
    { label: 'Ready-made data availability', tone: 'blue' },
    { label: 'In-house simulation complexity', tone: 'amber' },
  ],
} as const;

export const linkedin = {
  title: 'Connect with us on LinkedIn',
  banner: {
    lead: 'Datasets for ',
    accent: 'AI & ML',
  },
  company: 'kvet.io',
  tagline: 'Licensing & creating custom datasets for AI & ML teams worldwide',
  meta: 'Information Technology & Services • Warsaw, Mazowieckie • 2 – 10 employees',
  person: { name: 'Dzmitry', suffix: ' works here' },
  followers: { count: '6', label: 'followers' },
  actions: { follow: 'Follow', message: 'Message' },
} as const;

export const footer = {
  brand: 'kvetio',
  copyright: '© 2025 kvetio. All rights reserved.',
  links: [
    { label: 'Datasets', href: '#' },
    { label: 'Research', href: '#' },
    { label: 'Protocols', href: '#' },
    { label: 'Privacy', href: '#' },
  ],
} as const;

/** Alternative design: Figma frame "New site v2" (route /v2). */
export const splitHero = {
  brand: 'Kvetio',
  nav: ['Platform', 'Datasets', 'Solutions', 'Research'],
  title: 'Oddly specific AI training data',
  body: "We produce training data that doesn't exist yet — for your model only. High-throughput synthesis, pristine edge-case capture, and verified licensing.",
  secondaryCta: { label: 'Specifications', href: '/' },
  primaryCta: { label: 'Start Building' },
  slides: 4,
} as const;
