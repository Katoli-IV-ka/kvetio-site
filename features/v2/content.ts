export const NAV_LINKS = [
  { label: 'Philosophy', href: 'https://kvet.io/philosophy' },
  { label: 'Projects', href: 'https://kvet.io/projects' },
  { label: 'Infrastructure', href: 'https://kvet.io/infrastructure' },
  { label: 'Datasets', href: 'https://kvet.io/datasets' },
  { label: 'Research', href: 'https://kvet.io/research' },
  { label: 'Career', href: 'https://kvet.io/career' },
  { label: 'News', href: 'https://kvet.io/news' },
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
      { label: 'Philosophy', href: 'https://kvet.io/philosophy' },
      { label: 'Projects', href: 'https://kvet.io/projects' },
      { label: 'Infrastructure', href: 'https://kvet.io/infrastructure' },
      { label: 'Career', href: 'https://kvet.io/career' },
      { label: 'News', href: 'https://kvet.io/news' },
    ],
  },
  {
    label: 'Data types',
    links: [
      { label: 'Visual Data', href: 'https://kvet.io/datasets/visual' },
      { label: 'Audio & Speech', href: 'https://kvet.io/datasets/audio' },
      { label: 'Text & Documents', href: 'https://kvet.io/datasets/text' },
      { label: 'Sensor & Structured Data', href: 'https://kvet.io/datasets/sensor' },
      { label: 'Domain-Specific Data', href: 'https://kvet.io/datasets/domain' },
    ],
  },
  {
    label: 'Use cases',
    links: [
      { label: 'Egocentric', href: 'https://kvet.io/datasets/egocentric' },
      { label: 'Physical AI & Robotics', href: 'https://kvet.io/datasets/robotics' },
      { label: 'Agriculture', href: 'https://kvet.io/datasets/agriculture' },
      { label: 'Construction', href: 'https://kvet.io/datasets/construction' },
      { label: 'Retail & Fashion', href: 'https://kvet.io/datasets/retail' },
    ],
  },
  {
    label: 'Get started today',
    links: [
      { label: 'Brief', href: 'https://kvet.io/contact' },
      { label: 'Data Spec', href: 'https://kvet.io/infrastructure' },
      { label: 'Datasets', href: 'https://kvet.io/datasets' },
      { label: 'Research', href: 'https://kvet.io/research' },
      { label: 'Contact', href: 'https://kvet.io/contact' },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: 'https://kvet.io/privacy' },
  { label: 'Terms of Service', href: 'https://kvet.io/terms' },
  { label: 'Security', href: 'https://kvet.io/security' },
];
