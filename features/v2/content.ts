export const NAV_LINKS = [
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Physical AI', href: '#physical-ai' },
  { label: 'Data types', href: '#data-types' },
  { label: 'Process', href: '#process' },
  { label: 'Worldwide', href: '#worldwide' },
];

export type CardVariant = 'photo' | 'dark' | 'warm' | 'paper';

export type UseCaseCard = {
  id: string;
  title: string;
  text: string;
  tags: string[];
  variant: CardVariant;
  /** processed poster image behind the card */
  image: string;
};

export const USE_CASES: UseCaseCard[] = [
  {
    id: 'visual',
    title: 'Visual & Generative AI',
    text: 'Custom image and video datasets for training, post-training and evaluation — including controlled capture, multi-view data, RAW imagery, visual transformations, graphics, 2D/3D and VFX-based data production.',
    tags: ['Images', 'Video', 'Multi-view', 'Editing', '3D', 'VFX'],
    variant: 'warm',
    image: '/v2/uc/4.webp',
  },
  {
    id: 'human-activity',
    title: 'Human Activity & Real-World Interaction',
    text: 'Real-world human activities, skilled tasks, workflows and human-object interaction produced in controlled or natural environments.',
    tags: [
      'POV',
      'Professional workflows',
      'Multi-person interaction',
      'Fine-grained movement',
      'Tools / objects',
      'Longer task sequences',
    ],
    variant: 'photo',
    image: '/v2/uc/1.webp',
  },
  {
    id: 'physical-ai',
    title: 'Physical AI & Robotics',
    text: 'Human demonstrations and multimodal real-world data for embodied systems — from egocentric and synchronized multi-camera capture to RGB-D, motion and sensor data.',
    tags: [
      'Egocentric',
      'Synchronized multi-camera',
      'RGB-D',
      'Spatial capture',
      'Human demonstrations',
      'Motion',
      'IMU / sensors',
      'Protocol design',
      'Synchronization',
      'Metadata',
    ],
    variant: 'dark',
    image: '/v2/uc/3.webp',
  },
  {
    id: 'scale',
    title: 'Data Collection & Production at Scale',
    text: 'Controlled production, distributed collection and international sourcing built around a single dataset specification.',
    tags: ['Contributors', 'Countries', 'Locations', 'Rights', 'Metadata', 'QA', 'Licensing'],
    variant: 'paper',
    image: '/v2/uc/6.webp',
  },
];

export const PHYSICAL_AI_CAPTURE = [
  {
    title: 'Egocentric',
    text: "First-person view from the demonstrator's head or chest, with hands and objects in frame.",
  },
  {
    title: 'Synchronized multi-camera',
    text: 'Several fixed and wearable views of the same action, recorded on one timeline.',
  },
  {
    title: 'RGB-D',
    text: 'Colour and depth captured together, so every frame carries scene geometry.',
  },
  {
    title: 'Spatial capture',
    text: '3D scene and object capture for tasks that depend on space, reach and placement.',
  },
  {
    title: 'Motion',
    text: 'Hand, arm and body movement captured alongside the video.',
  },
  {
    title: 'IMU / sensors',
    text: 'Inertial and other sensors added where the task requires them.',
  },
];

export const PHYSICAL_AI_PROTOCOL = [
  {
    title: 'Human demonstrations',
    text: 'Real people performing the task, repeated across operators, objects and conditions.',
  },
  {
    title: 'Protocol design',
    text: "Task scripts, scenarios and variation plans written around your model's requirements.",
  },
  {
    title: 'Synchronization',
    text: 'Cameras and sensors time-aligned, so every stream matches frame for frame.',
  },
  {
    title: 'Metadata',
    text: 'Task, environment, setup and sensor details stored with every recording.',
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
    title: 'Requirement',
    text: 'Define the model task, target classes, edge cases, constraints, and success criteria.',
  },
  {
    title: 'Dataset Design',
    text: 'Turn requirements into collection rules, metadata schema, and annotation guidelines.',
  },
  {
    title: 'Pilot',
    text: 'Produce a small sample batch, review it with your team, and lock the spec before scaling up.',
  },
  {
    title: 'Production',
    text: 'Collect, capture, or source the data and label it to your schema, with consent and releases in place.',
  },
  {
    title: 'QA',
    text: 'Review samples, fix inconsistencies, and validate labels, metadata, and structure.',
  },
  {
    title: 'Delivery',
    text: 'Export in your preferred format and hand over a clean, documented dataset package.',
  },
  {
    title: 'Scale',
    text: 'Grow volume, locations, and variations on the same pipeline as your model needs more data.',
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
      { label: 'Visual & Generative AI', href: '#use-cases' },
      { label: 'Human Activity', href: '#use-cases' },
      { label: 'Physical AI & Robotics', href: '#physical-ai' },
      { label: 'Collection at Scale', href: '#use-cases' },
    ],
  },
  {
    label: 'Get started today',
    links: [
      { label: 'Requirement', href: '/contact' },
      { label: 'Dataset Design', href: '#process' },
      { label: 'Datasets', href: '#data-types' },
      { label: 'Research', href: '#worldwide' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Data Processing Policy', href: '/privacy-policy#processing' },
  { label: 'Terms of Service', href: '/privacy-policy' },
  { label: 'Security', href: '/privacy-policy#security' },
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
      {
        label: 'Visual & Generative AI',
        text: 'Images, video, multi-view, 3D, VFX',
        href: '#use-cases',
      },
      {
        label: 'Human Activity',
        text: 'Workflows and human-object interaction',
        href: '#use-cases',
      },
      {
        label: 'Physical AI & Robotics',
        text: 'Egocentric, multi-camera, RGB-D, sensors',
        href: '#physical-ai',
      },
      {
        label: 'Collection at Scale',
        text: 'Contributors, countries, rights, QA',
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
