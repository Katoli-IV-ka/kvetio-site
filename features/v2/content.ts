export const BRAND = 'Kvet';

export const CTA_LABEL = 'Discuss a dataset';

export const NAV_LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Physical AI', href: '#physical-ai' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'How we work', href: '#process' },
];

/* ---------- What we do: three ways of creating data ---------- */

export const WAYS: {
  title: string;
  tags: string[];
  text: string;
}[] = [
  {
    title: 'Controlled Production',
    tags: ['Sets & locations', 'Participants', 'Actions & objects', 'Capture setup', 'Protocol'],
    text: 'We build the environment, participants, actions, objects, capture setup and protocol around the requirements of the project.',
  },
  {
    title: 'Content Sourcing & Licensing',
    tags: ['Existing content', 'Licensing', 'Rights clearance', 'Metadata'],
    text: 'We find and license existing content when that is faster and more cost-effective than producing it from scratch.',
  },
  {
    title: 'Distributed Collection',
    tags: ['Contributors', 'Local teams', 'Geography', 'Diversity', 'Long-term capture'],
    text: 'Contributors and local teams collect data in their own places when geography, diversity, scale or duration matter most.',
  },
];

/* ---------- Core capabilities: tall cards, colour or photo grounds ---------- */

/** halftone: plain light ground; dark: plain dark ground; photo: black-and-white, evenly dimmed */
export type CapabilityLook = 'halftone' | 'dark' | 'photo';

export type Capability = {
  /** anchor id, used by the menu and footer links */
  id: string;
  title: string;
  text: string;
  look: CapabilityLook;
  image?: string;
  /** what the direction covers, revealed when the card opens */
  details: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: 'visual-ai',
    title: 'Visual & Generative AI',
    text: 'Custom image and video datasets for training, post-training and evaluation — spanning controlled visual production, human actions and interactions, video data for generative AI, creative workflows, 3D, graphics and VFX.',
    look: 'photo',
    image: '/v2/photos/field-desk.webp',
    details: [
      'Custom Image Data',
      'Video Data for Generative AI',
      'Human Actions & Interactions',
      'Multi-view & Controlled Capture',
      'Creative Workflow & Edit Trajectories',
      '3D, Graphics & VFX Production',
    ],
  },
  {
    id: 'human-activity',
    title: 'Human Activity & Real-World Interaction',
    text: 'Everyday and professional tasks, human-object interaction and multi-person scenes, in controlled or natural settings.',
    look: 'photo',
    image: '/v2/photos/pov-kitchen.webp',
    details: [
      'Skilled tasks',
      'Human-object interaction',
      'Task sequences',
      'Hands & body',
      'Dialogue & groups',
    ],
  },
  {
    id: 'physical-ai',
    title: 'Physical AI & Robotics',
    text: 'Human demonstrations and multimodal real-world data for Physical AI and robotics — including egocentric and synchronized multi-camera capture, human-object interaction, object manipulation, tool use, RGB-D, motion and sensor data.',
    look: 'photo',
    image: '/v2/photos/robot-tall.webp',
    details: [
      'Egocentric / POV',
      'Human-object interaction & manipulation',
      'Tool use',
      'Multi-camera & RGB-D',
      'Motion & sensors',
      'Sync & calibration',
      'Failure & recovery',
    ],
  },
  {
    id: 'collection-at-scale',
    title: 'Data Collection & Production at Scale',
    text: 'One consistent specification, scaled from pilot to full production across contributors, teams and countries.',
    look: 'photo',
    image: '/v2/photos/crowd.webp',
    details: [
      'Controlled production',
      'Distributed collection',
      'Multi-country',
      'Releases & rights',
      'Metadata & QA',
    ],
  },
];

/* ---------- Data we produce: dataset patterns ---------- */

export type DatasetPattern = {
  title: string;
  text: string;
  tags: string[];
};

export const DATASET_PATTERNS: DatasetPattern[] = [
  {
    title: 'Controlled Image & Video Data',
    text: 'People, objects, environments and activities captured under controlled variations of viewpoint, lighting, motion, setting and scenario.',
    tags: ['Image', 'Video', 'Multi-view', 'Controlled variations'],
  },
  {
    title: 'Human Actions & Interactions',
    text: 'Structured visual data covering everyday activities, professional workflows, human-object interaction, tool use and multi-step actions.',
    tags: ['Actions', 'Interactions', 'Workflows', 'Tool use'],
  },
  {
    title: 'Video Data for Generative AI',
    text: 'Purpose-built video data covering motion, human actions and interactions, continuity, camera movement and controlled visual variation.',
    tags: ['Motion', 'Continuity', 'Camera variation', 'Human interaction'],
  },
  {
    title: 'Creative Workflow & Edit Trajectories',
    text: 'Source assets, instructions, editing actions, project data, intermediate versions, metadata and final outputs captured as a structured creative workflow.',
    tags: ['Editing', 'Project data', 'Metadata', 'Decision traces'],
  },
  {
    title: 'Egocentric & Multimodal Activity Data',
    text: 'First-person and synchronized multi-camera data for real-world tasks, with RGB-D, motion and sensor modalities where required.',
    tags: ['POV', 'Multi-camera', 'RGB-D', 'Sensors'],
  },
  {
    title: '3D, Graphics & VFX Data Production',
    text: 'Standalone or integrated 3D, graphics, animation and VFX data projects, including compositing, controlled transformations and synthetic assets.',
    tags: ['3D', 'Graphics', 'Animation', 'VFX'],
  },
];

/* ---------- Creative Workflow & Edit Trajectories ---------- */

export const CREATIVE_WORKFLOW = {
  title: 'Creative Workflow & Edit Trajectories',
  text: 'Datasets that capture the creative process from source assets and instructions through editing actions, project data, intermediate versions, metadata and final outputs.',
  image: '/v2/photos/creative-workflow.webp',
  alt: 'A person working at a laptop and monitor in a dimly lit room with bookshelves behind',
  /** one illustrative trajectory, shown as a session log */
  logLabel: 'Example trajectory',
  steps: [
    { label: 'Source Assets', detail: 'raw clips, audio track' },
    { label: 'Instruction', detail: '“Cut a 15-second teaser, warm tones”' },
    { label: 'Editing Actions', detail: 'trim · reorder · grade · add title' },
    { label: 'Project Data', detail: 'timeline, layers, effect parameters' },
    { label: 'Intermediate Versions', detail: 'v1 → v2 → v3' },
    { label: 'Final Output', detail: 'teaser.mp4 + metadata' },
  ],
};

/* ---------- Production infrastructure ---------- */

export const INFRASTRUCTURE = [
  {
    title: 'People',
    text: 'Participants, skilled professionals and contributors, with signed releases.',
  },
  {
    title: 'Locations & environments',
    text: 'Homes, workplaces, studios and outdoor sites matched to the scenario.',
  },
  {
    title: 'Equipment & capture systems',
    text: 'POV rigs, multi-camera arrays, RGB-D and sensor setups built for the protocol.',
  },
  {
    title: 'Post-production, 3D & VFX',
    text: 'Editing, creative workflows, graphics, 3D and VFX production — delivered as standalone data projects or integrated into larger dataset pipelines.',
  },
  {
    title: 'International teams',
    text: 'Local production teams and contributor networks working to a consistent specification across countries and regions.',
  },
];

/* ---------- How we work ---------- */

export const PROCESS_STEPS = [
  {
    title: 'Requirements',
    text: 'Define the model task, target behaviors, constraints and success criteria.',
  },
  {
    title: 'Data Specification',
    text: 'Translate project requirements into scenarios, capture parameters, metadata structure, deliverables and QA criteria.',
  },
  {
    title: 'Pilot',
    text: 'Produce a small sample batch, review it with your team, and lock the spec before scaling up.',
  },
  {
    title: 'Production',
    text: 'Produce, collect or source the data with the required metadata, rights and releases in place.',
  },
  {
    title: 'QA',
    text: 'Review samples, fix inconsistencies, and validate metadata, structure and annotations where required.',
  },
  {
    title: 'Delivery',
    text: 'Hand over a clean, documented, rights-ready dataset in your preferred format.',
  },
  {
    title: 'Scale',
    text: 'Grow volume, locations and variations on the same pipeline as your model needs more data.',
  },
];

/* ---------- Why Kvet ---------- */

export const WHY = [
  {
    title: 'Built around your requirements',
    text: 'Every project is built around the specific data, environments, actions and capture conditions required.',
  },
  {
    title: 'Production-first',
    text: 'We organize the participants, environments, interactions and capture setups required to produce data that does not already exist.',
  },
  {
    title: 'Multiple production models',
    text: 'Controlled production, distributed collection and content sourcing can be used independently or combined within one project.',
  },
  {
    title: 'Visual and technical depth',
    text: 'Image and video production, egocentric and multi-camera capture, RGB-D, creative workflows, 3D, VFX and multimodal data within one production ecosystem.',
  },
  {
    title: 'From pilot to scale',
    text: 'Validate the approach with a focused pilot, then scale across participants, locations and countries.',
  },
  {
    title: 'Structured delivery',
    text: 'Rights, releases, metadata, QA and technical requirements are integrated into the production pipeline.',
  },
];

/* ---------- FAQ ---------- */

export const FAQ = [
  {
    question: 'How do you scope and price custom data projects?',
    answer:
      'Each project is scoped individually, based on data requirements, capture complexity, participants, locations, modalities, volume and delivery specifications. We start by reviewing your requirements and defining the most efficient production approach.',
  },
  {
    question: 'What is the typical pilot size and timeline?',
    answer:
      'It depends on the type of data and the capture setup. We usually recommend a focused, reviewable batch that validates the capture protocol, metadata and quality requirements before production scales.',
  },
  {
    question: 'What delivery formats do you support?',
    answer:
      'Formats and metadata schemas follow your project requirements: standard image and video formats, structured metadata such as CSV or JSON, and cloud-based delivery. Other formats can be supported when the project needs them.',
  },
  {
    question: 'How do you handle participant consent and releases?',
    answer:
      'Consent and usage rights are built into the production workflow. For projects involving identifiable people, we collect the appropriate releases and organize documentation according to the agreed requirements and intended data use.',
  },
  {
    question: 'Who owns the data and IP after delivery?',
    answer:
      'Ownership and licensing terms are agreed for each project before production begins — for example work-for-hire, exclusive licensing or another agreed structure.',
  },
  {
    question: 'Can you work under NDA and in specific countries?',
    answer:
      'Yes. We work under NDA and organize production across countries through local production teams and contributor networks. Geographic availability depends on project requirements, local regulations and capture conditions.',
  },
];

/* ---------- Solutions (landing pages) ---------- */

export const SOLUTION_LINKS = [
  { label: 'Physical AI & Robotics', href: '/physical-ai' },
  { label: 'Video Data for Generative AI', href: '/generative-video' },
  { label: 'Egocentric Data', href: '/egocentric-data' },
  { label: 'Image Datasets', href: '/image-data' },
  { label: 'Creative Workflow Data', href: '/ai-editing-data' },
  { label: 'Custom Data Collection', href: '/custom-data-collection' },
];

/* ---------- Footer and mobile menu ---------- */

export const FOOTER_COLUMNS = [
  {
    label: 'Capabilities',
    links: [
      { label: 'Visual & Generative AI', href: '#visual-ai' },
      { label: 'Human Activity', href: '#human-activity' },
      { label: 'Physical AI & Robotics', href: '#physical-ai' },
      { label: 'Collection at Scale', href: '#collection-at-scale' },
    ],
  },
  {
    label: 'Solutions',
    links: SOLUTION_LINKS,
  },
  {
    label: 'Company',
    links: [
      { label: 'What we do', href: '#what-we-do' },
      { label: 'Datasets', href: '#datasets' },
      { label: 'Infrastructure', href: '#infrastructure' },
      { label: 'How we work', href: '#process' },
      { label: 'Why Kvet', href: '#why' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { label: CTA_LABEL, href: '/contact' },
      { label: 'contact@kvet.io', href: 'mailto:contact@kvet.io' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kvet-io' },
      { label: 'Instagram', href: 'https://www.instagram.com/kvetio' },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Data Processing Policy', href: '/privacy-policy#processing' },
  { label: 'Security', href: '/privacy-policy#security' },
];

export type MenuGroup = {
  label: string;
  items: { label: string; text?: string; href: string }[];
};

/** Mobile burger menu: accordion groups first, then plain links, mirroring the footer sections. */
export const MENU_GROUPS: MenuGroup[] = [
  {
    label: 'Capabilities',
    items: [
      {
        label: 'Visual & Generative AI',
        text: 'Images, video, edit trajectories, 3D & VFX',
        href: '#visual-ai',
      },
      {
        label: 'Human Activity',
        text: 'Skilled tasks and human-object interaction',
        href: '#human-activity',
      },
      {
        label: 'Physical AI & Robotics',
        text: 'Egocentric, manipulation, RGB-D, sensors',
        href: '#physical-ai',
      },
      {
        label: 'Collection at Scale',
        text: 'Contributors, countries, rights, QA',
        href: '#collection-at-scale',
      },
    ],
  },
  {
    label: 'Solutions',
    items: SOLUTION_LINKS,
  },
];

export const MENU_LINKS = [
  { label: 'Datasets', href: '#datasets' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'How we work', href: '#process' },
  { label: 'Why Kvet', href: '#why' },
  { label: 'FAQ', href: '#faq' },
];
