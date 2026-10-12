export const NAV_LINKS = [
  { label: 'Philosophy', href: '#use-cases' },
  { label: 'Projects', href: '#use-cases' },
  { label: 'Infrastructure', href: '#process' },
  { label: 'Datasets', href: '#data-types' },
  { label: 'Research', href: '#worldwide' },
  { label: 'Career', href: '/contact' },
  { label: 'News', href: '/v1' },
];

export type UseCaseCard = {
  title: string[];
  text: string;
  image: string;
  crop: { top: string; left: string; width: string; height: string };
};

export const USE_CASES: UseCaseCard[] = [
  {
    title: ['Egocentric'],
    text: 'First-person video of real tasks, filmed through the eyes of the person doing them: hands, tools, objects, in your chosen environments.',
    image: '/v2/card-1.webp',
    crop: { top: '0', left: '-81.38%', width: '262.76%', height: '100%' },
  },
  {
    title: ['Home & everyday life'],
    text: 'Daily routines in real interiors, staged and filmed from the side: kitchens, living spaces, household devices in use.',
    image: '/v2/card-2.webp',
    crop: { top: '0', left: '-14.43%', width: '128.86%', height: '100%' },
  },
  {
    title: ['Physical AI &', 'Robotics'],
    text: 'Human demonstrations for teaching robots: hands, objects, manipulation, filmed from the angles your model needs.',
    image: '/v2/card-3.webp',
    crop: { top: '-0.97%', left: '0', width: '100%', height: '101.94%' },
  },
  {
    title: ['Agriculture'],
    text: 'Field work staged and filmed on location: machinery cabs, crops, tools and routines of the working day.',
    image: '/v2/card-4.webp',
    crop: { top: '-0.97%', left: '0', width: '100%', height: '101.94%' },
  },
  {
    title: ['Construction'],
    text: 'Building-site work staged and filmed on location: installation, tools, team tasks, safety gear.',
    image: '/v2/card-5.webp',
    crop: { top: '0', left: '-135.89%', width: '371.78%', height: '100%' },
  },
  {
    title: ['Documents &', 'privacy-safe data'],
    text: "Forms, letters, receipts and handwriting made from scratch: realistic, yet free of anyone's real personal data.",
    image: '/v2/card-6.webp',
    crop: { top: '0', left: '-11.35%', width: '122.71%', height: '100%' },
  },
  {
    title: ['People, crowds &', 'security'],
    text: "Staged scenes for detection and tracking: crowds, rare incidents, behavior, with every participant's signed release.",
    image: '/v2/card-7.webp',
    crop: { top: '0', left: '-6.74%', width: '113.48%', height: '100%' },
  },
  {
    title: ['Retail & Fashion'],
    text: 'Products, shelves and outfits, shot and labeled attribute by attribute for e-commerce and visual search.',
    image: '/v2/card-8.webp',
    crop: { top: '0', left: '-6.74%', width: '113.48%', height: '100%' },
  },
  {
    title: ['Anything oddly', 'specific'],
    text: "Don't see your case? We stage it: your city, your lighting, your rules.",
    image: '/v2/card-9.webp',
    crop: { top: '0', left: '-11.69%', width: '123.39%', height: '100%' },
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
      { label: 'Philosophy', href: '#use-cases' },
      { label: 'Projects', href: '#use-cases' },
      { label: 'Infrastructure', href: '#process' },
      { label: 'Career', href: '/contact' },
      { label: 'News', href: '/v1' },
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
      { label: 'Physical AI & Robotics', text: 'Manipulation, navigation, sensor data', href: '#use-cases' },
      { label: 'Agriculture', text: 'Field and farm-scene capture', href: '#use-cases' },
      { label: 'Construction', text: 'Building-site work filmed on location', href: '#use-cases' },
      { label: 'Retail & Fashion', text: 'Products, shelves and in-store behaviour', href: '#use-cases' },
    ],
  },
  {
    label: 'Data types',
    items: [
      { label: 'Visual Data', text: 'Images, video, frames, annotations', href: '#data-types' },
      { label: 'Audio & Speech', text: 'Voice, sound events, transcripts', href: '#data-types' },
      { label: 'Text & Documents', text: 'Prompts, structured text, document data', href: '#data-types' },
      { label: 'Sensor & Structured Data', text: 'Metadata, tabular data, device logs', href: '#data-types' },
      { label: 'Domain-Specific Data', text: 'Healthcare, retail, safety, industrial', href: '#data-types' },
    ],
  },
];

export const MENU_LINKS = [
  { label: 'Process', href: '#process' },
  { label: 'Worldwide', href: '#worldwide' },
  { label: 'News', href: '/v1' },
];
