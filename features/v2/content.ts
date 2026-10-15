export const NAV_LINKS = [
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Data types', href: '#data-types' },
  { label: 'Why custom data', href: '#why' },
  { label: 'Process', href: '#process' },
  { label: 'Worldwide', href: '#worldwide' },
  { label: 'Contact', href: '#contact' },
];

export type CardVariant = 'photo' | 'light' | 'dark' | 'warm' | 'paper';

export type UseCaseCard = {
  title: string[];
  text: string;
  variant: CardVariant;
  /** processed poster image for the card, if the variant uses one */
  image?: string;
};

export const USE_CASES: UseCaseCard[] = [
  {
    title: ['Egocentric'],
    text: 'First-person video of real tasks, filmed through the eyes of the person doing them: hands, tools, objects, in your chosen environments.',
    variant: 'photo',
    image: '/v2/uc/1.webp',
  },
  {
    title: ['Home & everyday life'],
    text: 'Daily routines in real interiors, staged and filmed from the side: kitchens, living spaces, household devices in use.',
    variant: 'light',
  },
  {
    title: ['Physical AI &', 'Robotics'],
    text: 'Human demonstrations for teaching robots: hands, objects, manipulation, filmed from the angles your model needs.',
    variant: 'dark',
    image: '/v2/uc/3.webp',
  },
  {
    title: ['Agriculture'],
    text: 'Field work staged and filmed on location: machinery cabs, crops, tools and routines of the working day.',
    variant: 'warm',
    image: '/v2/uc/4.webp',
  },
  {
    title: ['Construction'],
    text: 'Building-site work staged and filmed on location: installation, tools, team tasks, safety gear.',
    variant: 'light',
  },
  {
    title: ['Documents &', 'privacy-safe data'],
    text: "Forms, letters, receipts and handwriting made from scratch: realistic, yet free of anyone's real personal data.",
    variant: 'paper',
    image: '/v2/uc/6.webp',
  },
  {
    title: ['People, crowds &', 'security'],
    text: "Staged scenes for detection and tracking: crowds, rare incidents, behavior, with every participant's signed release.",
    variant: 'photo',
    image: '/v2/uc/7.webp',
  },
  {
    title: ['Retail & Fashion'],
    text: 'Products, shelves and outfits, shot and labeled attribute by attribute for e-commerce and visual search.',
    variant: 'paper',
    image: '/v2/uc/8.webp',
  },
  {
    title: ['Anything oddly', 'specific'],
    text: "Don't see your case? We stage it: your city, your lighting, your rules.",
    variant: 'dark',
    image: '/v2/uc/9.webp',
  },
];

export const DATA_TYPES = [
  {
    title: 'Visual Data',
    text: 'Images, video, frames, object scenes, action capture, and visual annotations.',
  },
  {
    title: 'Audio & Speech',
    text: 'Voice, environmental sound, conversations, sound events, and transcripts.',
  },
  {
    title: 'Text & Documents',
    text: 'Classification sets, prompts, transcripts, structured text, and document data.',
  },
  {
    title: 'Sensor & Structured Data',
    text: 'Metadata, tabular data, device logs, scenario attributes, and structured records.',
  },
  {
    title: 'Domain-Specific Data',
    text: 'Healthcare, agriculture, retail, safety, industrial, and niche workflows.',
  },
];

export const PROCESS_STEPS = [
  {
    title: 'Brief',
    text: 'Define the model task, target classes, edge cases, constraints, and success criteria.',
  },
  {
    title: 'Data Spec',
    text: 'Turn requirements into collection rules, metadata schema, and annotation guidelines.',
  },
  {
    title: 'Production',
    text: 'Collect, capture, or source the required photo, video, audio, or domain-specific data.',
  },
  {
    title: 'Rights',
    text: 'Prepare consent, usage clarity, release handling, and sensitive-data constraints.',
  },
  {
    title: 'Annotation',
    text: 'Label, classify, segment, caption, and enrich the data according to your ML pipeline.',
  },
  {
    title: 'QA',
    text: 'Review samples, fix inconsistencies, and validate labels, metadata, and structure.',
  },
  {
    title: 'Delivery',
    text: 'Export in your preferred format and hand over a clean, documented dataset package.',
  },
];

// x / y are positions on the 1024x1024 globe image; len is the stick length in px at a 640px map.
export const CITIES = [
  { name: 'Los Angeles', x: 225, y: 320, dir: 'up', len: 70 },
  { name: 'New York', x: 392, y: 345, dir: 'up', len: 95 },
  { name: 'Mexico City', x: 290, y: 455, dir: 'down', len: 75 },
  { name: 'São Paulo', x: 590, y: 735, dir: 'down', len: 85 },
  { name: 'Buenos Aires', x: 495, y: 860, dir: 'down', len: 55 },
  { name: 'London', x: 800, y: 250, dir: 'up', len: 105 },
  { name: 'Lagos', x: 840, y: 470, dir: 'down', len: 80 },
  { name: 'Cairo', x: 895, y: 370, dir: 'up', len: 45 },
] as const;

export const FOOTER_COLUMNS = [
  {
    label: 'Company',
    links: [
      { label: 'Use cases', href: '#use-cases' },
      { label: 'Process', href: '#process' },
      { label: 'Worldwide', href: '#worldwide' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    label: 'Data types',
    links: [
      { label: 'Visual Data', href: '#data-types' },
      { label: 'Audio & Speech', href: '#data-types' },
      { label: 'Text & Documents', href: '#data-types' },
      { label: 'Sensor & Structured Data', href: '#data-types' },
      { label: 'Domain-Specific Data', href: '#data-types' },
    ],
  },
  {
    label: 'Use cases',
    links: [
      { label: 'Egocentric', href: '#use-cases' },
      { label: 'Physical AI & Robotics', href: '#use-cases' },
      { label: 'Agriculture', href: '#use-cases' },
      { label: 'Construction', href: '#use-cases' },
      { label: 'Retail & Fashion', href: '#use-cases' },
    ],
  },
  {
    label: 'Get started today',
    links: [
      { label: 'Brief', href: '/contact' },
      { label: 'Data Spec', href: '#process' },
      { label: 'Datasets', href: '#data-types' },
      { label: 'Research', href: '#worldwide' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/privacy-policy' },
  { label: 'Security', href: '/privacy-policy' },
];

export type MenuGroup = {
  label: string;
  items: { label: string; text?: string; href: string }[];
};

/** Mobile burger menu: accordion groups first, then plain links, mirroring the footer sections. */
export const MENU_GROUPS: MenuGroup[] = [
  {
    label: 'Use cases',
    items: [
      { label: 'Egocentric', text: 'First-person video of real tasks', href: '#use-cases' },
      {
        label: 'Physical AI & Robotics',
        text: 'Manipulation, navigation, sensor data',
        href: '#use-cases',
      },
      { label: 'Agriculture', text: 'Field and farm-scene capture', href: '#use-cases' },
      { label: 'Construction', text: 'Building-site work filmed on location', href: '#use-cases' },
      {
        label: 'Retail & Fashion',
        text: 'Products, shelves and in-store behaviour',
        href: '#use-cases',
      },
    ],
  },
  {
    label: 'Data types',
    items: [
      { label: 'Visual Data', text: 'Images, video, frames, annotations', href: '#data-types' },
      { label: 'Audio & Speech', text: 'Voice, sound events, transcripts', href: '#data-types' },
      {
        label: 'Text & Documents',
        text: 'Prompts, structured text, document data',
        href: '#data-types',
      },
      {
        label: 'Sensor & Structured Data',
        text: 'Metadata, tabular data, device logs',
        href: '#data-types',
      },
      {
        label: 'Domain-Specific Data',
        text: 'Healthcare, retail, safety, industrial',
        href: '#data-types',
      },
    ],
  },
];

export const MENU_LINKS = [
  { label: 'Process', href: '#process' },
  { label: 'Worldwide', href: '#worldwide' },
  { label: 'News', href: '/v1' },
];
