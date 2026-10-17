export const BRAND = 'Kvet';

export const CTA_LABEL = 'Discuss a dataset';

export const NAV_LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Physical AI', href: '#physical-ai' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'How we work', href: '#process' },
  { label: 'Projects', href: '#projects' },
];

/* ---------- What we do: three ways of creating data (stacked cards) ---------- */

/** photo: picture under a dark shade, white type; paper: light picture, dark type */
export type CardVariant = 'photo' | 'paper';

export const WAYS: {
  title: string;
  image: string;
  variant: CardVariant;
  tags: string[];
  text: string;
}[] = [
  {
    title: 'Controlled Production',
    image: '/v2/ways/production.webp',
    variant: 'photo',
    tags: ['Sets & locations', 'Cast', 'Actions & objects', 'Camera setup', 'Protocol'],
    text: 'We build the environment, cast, actions, objects, camera setup and protocol around the exact requirements of your dataset.',
  },
  {
    title: 'Content Sourcing & Licensing',
    image: '/v2/ways/licensing.webp',
    variant: 'paper',
    tags: ['Existing content', 'Licensing', 'Rights clearance', 'Metadata'],
    text: 'We find and license existing content when that is faster and more cost-effective than producing it from scratch.',
  },
  {
    title: 'Distributed Collection',
    image: '/v2/photos/pov-kitchen.webp',
    variant: 'photo',
    tags: ['Contributors', 'Local teams', 'Geography', 'Diversity', 'Long-term capture'],
    text: 'Contributors and local teams collect data in their own places when geography, diversity, scale or duration matter most.',
  },
];

/* ---------- Core capabilities: photo cards, one per direction ---------- */

export type Capability = {
  /** anchor id, used by the menu and footer links */
  id: string;
  title: string;
  text: string;
  image: string;
  variant: CardVariant;
  spec: { title: string; text: string }[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: 'visual-ai',
    title: 'Visual & Generative AI',
    text: 'Controlled image and video data for training, post-training and evaluation.',
    image: '/v2/uc/9.webp',
    variant: 'photo',
    spec: [
      { title: 'Images & RAW', text: 'Controlled collections, RAW / ProRAW' },
      { title: 'Multi-view', text: 'Several cameras on one subject or scene' },
      { title: 'Generative video', text: 'Continuity, motion and visual variation' },
      { title: 'Editing pairs', text: 'Source, instruction and output' },
      { title: '2D, 3D & VFX', text: 'Controlled and transformation data' },
    ],
  },
  {
    id: 'human-activity',
    title: 'Human Activity & Real-World Interaction',
    text: 'Everyday and professional activities, produced in controlled or natural environments.',
    image: '/v2/photos/home-fridge.webp',
    variant: 'photo',
    spec: [
      { title: 'Skilled tasks', text: 'Multi-step professional workflows' },
      { title: 'Human-object interaction', text: 'Hands, tools and objects in use' },
      { title: 'Task sequences', text: 'Demonstrations from start to finish' },
      { title: 'Hands & body', text: 'Fine-grained gestures and movement' },
      { title: 'Dialogue & groups', text: 'Conversations and multi-person scenes' },
    ],
  },
  {
    id: 'physical-ai',
    title: 'Physical AI & Robotics',
    text: 'Human demonstrations for teaching robots, delivered synchronized, calibrated and documented.',
    image: '/v2/photos/robot-arm.webp',
    variant: 'paper',
    spec: [
      { title: 'Egocentric', text: 'Head- or chest-mounted, hands in frame' },
      { title: 'Multi-camera & RGB-D', text: 'Synced views with depth' },
      { title: 'Motion & sensors', text: 'Hand and body motion, IMU, force/contact' },
      { title: 'Sync & calibration', text: 'Streams aligned, setups logged' },
      { title: 'Failure & recovery', text: 'Retries recorded on purpose' },
    ],
  },
  {
    id: 'collection-at-scale',
    title: 'Data Collection & Production at Scale',
    text: 'One dataset specification, run from pilot to full volume across teams and countries.',
    image: '/v2/photos/crowd.webp',
    variant: 'photo',
    spec: [
      { title: 'Controlled production', text: 'Sets, cast and protocol' },
      { title: 'Distributed collection', text: 'Contributors and local teams' },
      { title: 'Multi-country', text: 'The same spec in every location' },
      { title: 'Rights', text: 'Releases and licensing for training' },
      { title: 'Metadata & QA', text: 'Annotation and checks built in' },
    ],
  },
];

/* ---------- Data we produce: dataset patterns ---------- */

export const DATASET_PATTERNS = [
  {
    title: 'Egocentric task recordings',
    text: 'Household and professional tasks filmed from the head or chest, with hands, tools and objects in frame.',
    spec: 'POV video · narration · task labels',
  },
  {
    title: 'Multi-camera manipulation',
    text: 'The same grasp, place or assembly seen from fixed and wearable cameras on one timeline.',
    spec: 'Synced views · RGB-D · hand pose',
  },
  {
    title: 'Editing & transformation pairs',
    text: 'A source frame, an instruction and the edited result: relighting, cleanup, object and background changes.',
    spec: 'Source · instruction · output',
  },
  {
    title: 'Generative video sets',
    text: 'Shots planned for continuity, motion and controlled visual variation, for training and evaluation.',
    spec: 'Video · camera & lighting metadata',
  },
  {
    title: 'Controlled image collections',
    text: 'People, objects and environments shot under planned variations of light, angle and lens.',
    spec: 'RAW / ProRAW · multi-view',
  },
  {
    title: 'Skilled workflows',
    text: 'Multi-step professional procedures performed by trained people in real workplaces.',
    spec: 'Step labels · before / after',
  },
  {
    title: 'Dialogue & multi-person interaction',
    text: 'Conversations and group activities with every participant released for training use.',
    spec: 'Video · audio · transcripts',
  },
  {
    title: 'Rare & controlled scenarios',
    text: 'Situations that are hard to find in the wild, staged safely and repeated with variations.',
    spec: 'Scenario scripts · variation plan',
  },
];

/* ---------- Production infrastructure ---------- */

export const INFRASTRUCTURE = [
  {
    title: 'People',
    text: 'Casting of performers, skilled professionals and contributors, with signed releases.',
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
    title: 'Post-production',
    text: 'Editing, transformation, 2D/3D and VFX work done as part of the data pipeline.',
  },
  {
    title: 'International teams',
    text: 'Local producers and contributor networks running the same spec in every country.',
  },
];

/* ---------- How we work ---------- */

export const PROCESS_STEPS = [
  {
    title: 'Requirement',
    text: 'Define the model task, target behaviours, constraints and success criteria.',
  },
  {
    title: 'Dataset Design',
    text: 'Turn requirements into scenarios, capture setup, metadata schema and annotation guidelines.',
  },
  {
    title: 'Pilot',
    text: 'Produce a small sample batch, review it with your team, and lock the spec before scaling up.',
  },
  {
    title: 'Production',
    text: 'Collect, capture or source the data and label it to your schema, with consent and releases in place.',
  },
  {
    title: 'QA',
    text: 'Review samples, fix inconsistencies, and validate labels, metadata and structure.',
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

/* ---------- Selected projects ----------
   PLACEHOLDERS: replace every bracketed value with a real anonymized project before launch. */

export const PROJECTS_ARE_PLACEHOLDERS = true;

export const PROJECTS = [
  {
    area: 'Physical AI & Robotics',
    title: '[Project title, e.g. household manipulation demonstrations]',
    rows: [
      { label: 'Task', text: '[What the model had to learn]' },
      { label: 'Setup', text: '[Cameras, sensors, locations, performers]' },
      { label: 'Scale', text: '[Hours / clips / participants / countries]' },
      { label: 'QA & delivery', text: '[Checks, format, metadata, rights]' },
    ],
  },
  {
    area: 'Visual & Generative AI',
    title: '[Project title, e.g. editing pairs for an image model]',
    rows: [
      { label: 'Task', text: '[What the model had to learn]' },
      { label: 'Setup', text: '[Studio, lighting, capture and post-production]' },
      { label: 'Scale', text: '[Images / pairs / variations]' },
      { label: 'QA & delivery', text: '[Checks, format, metadata, rights]' },
    ],
  },
  {
    area: 'Data Collection at Scale',
    title: '[Project title, e.g. multi-country everyday activities]',
    rows: [
      { label: 'Task', text: '[What the model had to learn]' },
      { label: 'Setup', text: '[Contributors, local teams, protocol]' },
      { label: 'Scale', text: '[Contributors / countries / hours]' },
      { label: 'QA & delivery', text: '[Checks, format, metadata, rights]' },
    ],
  },
];

/* ---------- Scale & proof ----------
   PLACEHOLDERS: the numbers below must be replaced with real figures before launch. */

export const STATS = [
  { value: '[XX]', label: 'countries with production or collection' },
  { value: '[XX]', label: 'contributors and performers' },
  { value: '[XX]', label: 'hours of data captured' },
  { value: '[XX]', label: 'datasets delivered' },
];

export const RIGHTS_READY = [
  {
    title: 'Releases',
    text: 'Signed likeness and location releases from every participant and site.',
  },
  {
    title: 'Licensing',
    text: 'Usage terms that allow commercial training, documented per asset.',
  },
  {
    title: 'Metadata',
    text: 'Setup, scenario, participant and capture details delivered with the data.',
  },
  {
    title: 'QA',
    text: 'Sample review and validation of labels, structure and coverage before handover.',
  },
];

/* ---------- Why Kvet ---------- */

export const WHY = [
  {
    them: 'Data marketplaces',
    theyDo: 'Sell what already exists, as it is.',
    weDo: 'We produce what does not exist yet, to your specification.',
  },
  {
    them: 'Crowdsourcing platforms',
    theyDo: 'Deliver volume of simple tasks with little control over setup.',
    weDo: 'We design the protocol, capture setup and QA, then scale it.',
  },
  {
    them: 'Production studios',
    theyDo: 'Make great footage that is not built for training.',
    weDo: 'We deliver datasets: metadata, annotation, releases and rights.',
  },
];

/* ---------- Solutions (landing pages) ---------- */

export const SOLUTION_LINKS = [
  { label: 'Physical AI & Robotics', href: '/physical-ai' },
  { label: 'Generative Video', href: '/generative-video' },
  { label: 'Egocentric Data', href: '/egocentric-data' },
  { label: 'Image Datasets', href: '/image-data' },
  { label: 'AI Editing Data', href: '/ai-editing-data' },
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
      { label: 'Projects', href: '#projects' },
      { label: 'Why Kvet', href: '#why' },
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
        text: 'Images, video, editing, 3D, VFX',
        href: '#visual-ai',
      },
      {
        label: 'Human Activity',
        text: 'Skilled tasks and human-object interaction',
        href: '#human-activity',
      },
      {
        label: 'Physical AI & Robotics',
        text: 'Egocentric, multi-camera, RGB-D, sensors',
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
  { label: 'Projects', href: '#projects' },
  { label: 'Why Kvet', href: '#why' },
];
