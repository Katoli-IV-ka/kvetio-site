// Copy and data for the redesigned landing page.

export type UseCaseCard = {
  image: string;
  alt: string;
  position: string;
  /** Dark header text on bright photos, white on dark ones. */
  headerTone: 'light' | 'dark';
  topScrim: boolean;
  title: string;
  description: string;
};

export const introCopy = {
  title: 'Oddly specific AI training data',
  description:
    "We produce training data that doesn't exist yet — for your model only. High-throughput synthesis, pristine edge-case capture, and verified licensing.",
};

export const navLinks = [
  { label: 'Platform', href: '#modalities' },
  { label: 'Datasets', href: '#cases' },
  { label: 'Solutions', href: '#accuracy' },
  { label: 'Research', href: '#team' },
];

export const useCaseCards: UseCaseCard[] = [
  {
    image: 'cooking',
    alt: 'First-person view of hands cooking over a stove',
    position: '50% 60%',
    headerTone: 'light',
    topScrim: true,
    title: 'Egocentric',
    description:
      'First-person video of real tasks, filmed through the eyes of the person doing them: hands, tools, objects, in your chosen environments.',
  },
  {
    image: 'fridge',
    alt: 'Person taking vegetables out of an open fridge in a home kitchen',
    position: '50% 55%',
    headerTone: 'dark',
    topScrim: false,
    title: 'Home & everyday life',
    description:
      'Daily routines in real interiors, staged and filmed from the side: kitchens, living spaces, household devices in use.',
  },
  {
    image: 'robot',
    alt: 'Wireframe render of an industrial robot arm',
    position: '50% 50%',
    headerTone: 'light',
    topScrim: false,
    title: 'Physical AI & Robotics',
    description:
      'Human demonstrations for teaching robots: hands, objects, manipulation, filmed from the angles your model needs.',
  },
  {
    image: 'tractor',
    alt: 'Aerial view of a tractor mowing a field',
    position: '50% 50%',
    headerTone: 'light',
    topScrim: true,
    title: 'Agriculture',
    description:
      'Field work staged and filmed on location: machinery cabs, crops, tools and routines of the working day.',
  },
  {
    image: 'construction',
    alt: 'Worker installing a window frame with a drill',
    position: '60% 50%',
    headerTone: 'light',
    topScrim: true,
    title: 'Construction',
    description:
      'Building-site work staged and filmed on location: installation, tools, team tasks, safety gear.',
  },
  {
    image: 'letter',
    alt: 'Typed letter with redacted fragments',
    position: '50% 30%',
    headerTone: 'dark',
    topScrim: false,
    title: 'Documents & privacy-safe data',
    description:
      "Forms, letters, receipts and handwriting made from scratch: realistic, yet free of anyone's real personal data.",
  },
  {
    image: 'crowd',
    alt: 'Crowd seen from behind with one figure highlighted in blue',
    position: '75% 50%',
    headerTone: 'light',
    topScrim: true,
    title: 'People, crowds & security',
    description:
      "Staged scenes for detection and tracking: crowds, rare incidents, behavior, with every participant's signed release.",
  },
  {
    image: 'retail',
    alt: 'Flat lay of a black jacket, trousers, loafers, laptop and coffee',
    position: '35% 50%',
    headerTone: 'dark',
    topScrim: false,
    title: 'Retail & Fashion',
    description:
      'Products, shelves and outfits, shot and labeled attribute by attribute for e-commerce and visual search.',
  },
  {
    image: 'hawk',
    alt: 'Hawk in flight with mathematical axes drawn over it',
    position: '50% 45%',
    headerTone: 'dark',
    topScrim: false,
    title: 'Anything oddly specific',
    description: "Don't see your case? We stage it: your city, your lighting, your rules.",
  },
];

export const accuracyCopy = {
  title: 'Data for Final AI Accuracy',
  description:
    'The smarter the model, the harder it is to find fine-tuning data. Standard datasets no longer work, and creating rare cases in-house is too expensive. We deliver unique, ready-to-use edge cases that cannot be found in the wild.',
  stages: ['Early stages', 'Plateau', 'Production ready'],
  legend: ['Ready-made data availability', 'In-house simulation complexity'],
};

export const pillarsHeading = 'How we work';

export const pillarCopy = {
  proprietary: {
    eyebrow: 'Proprietary capture',
    title: "Your model needs data that doesn't exist yet. We produce it.",
  },
  anyData: {
    eyebrow: 'Any data type',
    title: 'Any format.',
    subtitle: 'Any industry.',
    description:
      "Photo and video are key use cases for us, but we don't limit ourselves to one data type or one industry. Audio, text, sensor, and domain-specific data: the workflow is built around your requirements, not around what we already have.",
  },
  rights: {
    title: 'Rights-ready',
    description:
      'Data produced for you meets your legal and technical requirements, exactly as written in your brief.',
  },
};

export const teamCopy = {
  title: 'Production-first data team',
  description:
    'We are a full-service visual production company. Initially, we professionally created high-quality photo and video content for leading marketplaces and brands.',
};

export const modalityCopy = {
  title: 'Whatever your model reads',
  description:
    'Photo and video are strong use cases for us, but the workflow is built around the model requirement: modality, domain rules, annotation schema, and delivery format.',
  rows: [
    {
      title: 'Visual Data',
      description: 'Images, video, frames, object scenes, action capture, and visual annotations.',
    },
    {
      title: 'Audio & Speech',
      description: 'Voice, environmental sound, conversations, sound events, and transcripts.',
    },
    {
      title: 'Text & Documents',
      description: 'Classification sets, prompts, transcripts, structured text, and document data.',
    },
    {
      title: 'Sensor & Structured Data',
      description:
        'Metadata, tabular data, device logs, scenario attributes, and structured records.',
    },
    {
      title: 'Domain-Specific Data',
      description: 'Healthcare, agriculture, retail, safety, industrial, and niche workflows.',
    },
  ],
};

export type CityMarker = {
  name: string;
  /** Marker position inside the 1000x560 map viewBox. */
  x: number;
  y: number;
  /** Label centre inside the map viewBox. */
  labelX: number;
  labelY: number;
  labelWidth: number;
};

export const networkCopy = { title: 'We shoot worldwide' };

export const cities: CityMarker[] = [
  { name: 'Berlin', x: 537.2, y: 191.1, labelX: 470, labelY: 148, labelWidth: 55.6 },
  { name: 'Warsaw', x: 558.3, y: 192.2, labelX: 556, labelY: 138, labelWidth: 55.6 },
  { name: 'Minsk', x: 576.7, y: 185.8, labelX: 642, labelY: 150, labelWidth: 50 },
  { name: 'Prague', x: 540, y: 200, labelX: 590, labelY: 238, labelWidth: 55.6 },
  { name: 'Madrid', x: 489.7, y: 233.4, labelX: 430, labelY: 228, labelWidth: 55.6 },
  { name: 'New York', x: 294.4, y: 232.4, labelX: 352, labelY: 262, labelWidth: 66.8 },
  { name: 'Tokyo', x: 888.1, y: 248.6, labelX: 925, labelY: 292, labelWidth: 50 },
  { name: 'Dubai', x: 653.6, y: 280.6, labelX: 655, labelY: 324, labelWidth: 50 },
];

export const linkedinCopy = {
  title: 'Connect with us on LinkedIn',
  banner: 'Datasets for',
  bannerAccent: 'AI & ML',
  name: 'kvet.io',
  tagline: 'Licensing & creating custom datasets for AI & ML teams worldwide',
  meta: 'Information Technology & Services • Warsaw, Mazowieckie • 2–10 employees',
  url: 'https://www.linkedin.com/company/kvet-io',
  person: 'Dzmitry',
  followers: 6,
};
