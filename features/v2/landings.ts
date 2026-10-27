/** Solution landing pages: each answers "Can Kvet solve this exact data problem?" */

export type LandingItem = { title: string; text: string };

export type Landing = {
  slug: string;
  /** short name for links and the page title */
  name: string;
  title: string;
  lead: string;
  text: string;
  description: string;
  /** wide photo next to the hero copy; pages without one show the halftone art */
  image?: string;
  imageAlt?: string;
  /** hero button label; the shared CTA when not set */
  cta?: string;
  /** steps of the data structure, shown as a chain under the hero copy */
  flow?: string[];
  produce: LandingItem[];
  howLabel: string;
  how: LandingItem[];
};

export const LANDINGS: Landing[] = [
  {
    slug: 'physical-ai',
    name: 'Physical AI & Robotics',
    image: '/v2/photos/robot-wireframe.webp',
    imageAlt: 'Wireframe render of a robotic arm with a gripper',
    title: 'Real-world data for Physical AI & Robotics',
    lead: 'Human demonstrations and multimodal capture for embodied systems.',
    text: 'We design and run capture protocols for manipulation and real-world tasks — egocentric, synchronized multi-camera, RGB-D and sensor data, delivered calibrated and documented.',
    description:
      'Egocentric, multi-camera, RGB-D and sensor data for robotics: human demonstrations and manipulation tasks captured to your protocol by Kvet.',
    produce: [
      {
        title: 'Human demonstrations',
        text: 'Real people performing the task, repeated across operators, objects and conditions.',
      },
      {
        title: 'Human-object interaction & manipulation',
        text: 'Grasping, placing, assembling and handling objects, with hands and objects in view.',
      },
      {
        title: 'Tool use',
        text: 'Real tools used for real tasks, with the hand, tool and workpiece captured together.',
      },
      {
        title: 'Egocentric / POV',
        text: "First-person view from the demonstrator's head or chest, hands and objects in frame.",
      },
      {
        title: 'Synchronized multi-camera',
        text: 'Fixed and wearable views of the same action on one timeline.',
      },
      {
        title: 'RGB-D & spatial capture',
        text: 'Color, depth and 3D scene geometry for reach, placement and navigation.',
      },
      {
        title: 'Hand & body motion',
        text: 'Hand, arm and body movement captured alongside the video.',
      },
      {
        title: 'Failure & recovery',
        text: 'Failed attempts, retries and recoveries recorded on purpose where needed.',
      },
    ],
    howLabel: 'How we run it',
    how: [
      {
        title: 'Protocol design',
        text: 'Task scripts, scenarios and variation plans written around your policy.',
      },
      {
        title: 'Capture systems',
        text: 'POV rigs, camera arrays, RGB-D, IMU and force/contact sensors as required.',
      },
      {
        title: 'Synchronization & calibration',
        text: 'Streams time-aligned and every setup calibrated and logged.',
      },
      {
        title: 'Metadata & QA',
        text: 'Task, environment and sensor details stored and checked for every session.',
      },
    ],
  },
  {
    slug: 'generative-video',
    name: 'Video Data for Generative AI',
    image: '/v2/ways/production.webp',
    imageAlt: 'Motion capture studio: performers on set and their 3D skeletons on a monitor',
    title: 'Training & evaluation data for generative video models',
    lead: 'Video planned for continuity, motion and controlled visual variation.',
    text: 'We produce footage the way your model needs to see the world — with controlled camera, lighting, motion and scene changes, plus edit trajectories and 3D/VFX data built on top of it.',
    description:
      'Custom video datasets for generative video models: continuity, motion, controlled visual variation, edit trajectories and 3D/VFX data produced by Kvet.',
    produce: [
      {
        title: 'Continuity & motion',
        text: 'Shots designed around consistent subjects, physics and camera movement.',
      },
      {
        title: 'Controlled variation',
        text: 'The same scene repeated across lighting, lens, angle and environment.',
      },
      {
        title: 'Multi-view video',
        text: 'Several synchronized cameras recording one action for 3D-aware models.',
      },
      {
        title: 'Edit trajectories',
        text: 'Source clips, instructions, editing steps and results for video editing models.',
      },
      {
        title: 'Evaluation sets',
        text: 'Held-out shots and prompts built to measure specific model behaviors.',
      },
      {
        title: 'Camera & scene metadata',
        text: 'Lens, movement, lighting and scene descriptions delivered with every clip.',
      },
    ],
    howLabel: 'How we produce it',
    how: [
      {
        title: 'Shot design',
        text: 'Variation plans and shot lists derived from your training or eval goals.',
      },
      {
        title: 'Controlled production',
        text: 'Cast, locations, lighting and camera crews working to the dataset spec.',
      },
      {
        title: '3D, graphics & VFX',
        text: 'Standalone or integrated 3D, graphics and VFX production for AI data projects.',
      },
      {
        title: 'Rights-ready delivery',
        text: 'Releases, licensing, captions and metadata packaged in your format.',
      },
    ],
  },
  {
    slug: 'egocentric-data',
    name: 'Egocentric Data',
    image: '/v2/photos/pov-kitchen.webp',
    imageAlt: 'First-person view of hands cutting vegetables over a stove',
    title: 'Egocentric & first-person data',
    lead: 'Real activities filmed through the eyes of the person doing them.',
    text: 'We capture POV data of everyday and skilled tasks with wearable and stereo rigs, in real homes and workplaces, with narration and synchronized modalities where your model needs them.',
    description:
      'Egocentric and first-person datasets: POV, wearable and stereo capture of everyday and skilled tasks, narration and synchronized modalities by Kvet.',
    produce: [
      {
        title: 'Everyday activities',
        text: 'Cooking, cleaning and household routines in real interiors.',
      },
      {
        title: 'Skilled tasks',
        text: 'Professional, multi-step procedures performed by trained people.',
      },
      {
        title: 'Human-object interaction',
        text: 'Hands, tools and objects in frame through the whole task.',
      },
      {
        title: 'Narration',
        text: 'Spoken or written descriptions of what is being done and why.',
      },
      {
        title: 'Stereo & wearable capture',
        text: 'Head- and chest-mounted, mono or stereo rigs chosen for your model.',
      },
      {
        title: 'Synchronized modalities',
        text: 'Exo views, IMU, gaze or audio aligned with the POV stream.',
      },
    ],
    howLabel: 'How we run it',
    how: [
      {
        title: 'Participants & locations',
        text: 'Contributors and environments recruited for diversity and realism.',
      },
      {
        title: 'Task protocols',
        text: 'Scripts and variation plans that keep long recordings consistent.',
      },
      {
        title: 'Distributed or controlled',
        text: 'Captured at home by contributors or on set by our crews.',
      },
      {
        title: 'Annotation & QA',
        text: 'Step labels, timestamps and checks for coverage and quality.',
      },
    ],
  },
  {
    slug: 'image-data',
    name: 'Image Datasets',
    title: 'Custom image datasets',
    lead: 'Controlled images of people, objects and environments.',
    text: 'We shoot and collect image data under planned variations — including RAW and ProRAW, multi-view sets and domain-specific collections — with releases and metadata for every frame.',
    description:
      'Custom image datasets: controlled images, RAW / ProRAW, people, objects, environments, multi-view and domain-specific collections produced by Kvet.',
    produce: [
      {
        title: 'Controlled collections',
        text: 'Planned variations of light, angle, lens and background.',
      },
      {
        title: 'RAW / ProRAW',
        text: 'Unprocessed sensor data for imaging and camera pipelines.',
      },
      {
        title: 'People',
        text: 'Diverse participants with signed likeness releases.',
      },
      {
        title: 'Objects & products',
        text: 'Items shot attribute by attribute, in context or in studio.',
      },
      {
        title: 'Environments',
        text: 'Interiors, workplaces and outdoor scenes matched to your domain.',
      },
      {
        title: 'Multi-view',
        text: 'Synchronized cameras capturing the same subject from several angles.',
      },
    ],
    howLabel: 'How we produce it',
    how: [
      {
        title: 'Capture spec',
        text: 'Devices, settings and variation matrix defined before the first shot.',
      },
      {
        title: 'Studio & location',
        text: 'Controlled shoots or distributed collection, depending on the goal.',
      },
      {
        title: 'Metadata',
        text: 'EXIF, scene, subject and setup details delivered per image.',
      },
      {
        title: 'Rights & QA',
        text: 'Releases, licensing and quality checks before handover.',
      },
    ],
  },
  {
    slug: 'ai-editing-data',
    name: 'Creative Workflow & Edit Trajectories',
    cta: 'Discuss a workflow dataset',
    title: 'Creative workflow & edit trajectory datasets',
    lead: 'Not just the result — every step between the source and the final output.',
    text: 'Datasets that capture the creative process from source assets and instructions through editing actions, project data, intermediate versions, metadata and final outputs.',
    flow: [
      'Source Assets',
      'Instruction',
      'Editing Actions',
      'Project Data',
      'Intermediate Versions',
      'Final Output',
    ],
    description:
      'Creative workflow and edit trajectory datasets for AI: source → instruction → result pairs and full trajectories with editing actions, project data, intermediate versions and metadata.',
    produce: [
      {
        title: 'Edit trajectories',
        text: 'Source assets, brief, editing actions, project data, intermediate versions and the final output.',
      },
      {
        title: 'Editing & transformation pairs',
        text: 'One data type within a trajectory: source → instruction → result.',
      },
      {
        title: 'Cleanup & retouch',
        text: 'Object removal, restoration and detail correction.',
      },
      {
        title: 'Compositing',
        text: 'Subjects and objects added to scenes with matching light and perspective.',
      },
      {
        title: 'Relighting',
        text: 'The same scene captured or rendered under different lighting.',
      },
      {
        title: 'Object & background changes',
        text: 'Swaps, replacements and attribute edits with exact before / after.',
      },
    ],
    howLabel: 'How we produce it',
    how: [
      {
        title: 'Paired capture',
        text: 'Before and after shot on set, so the ground truth is real.',
      },
      {
        title: '3D, graphics & VFX',
        text: 'Standalone or integrated 3D, graphics and VFX production for AI data projects: 3D assets, animation, graphics, compositing, cleanup, VFX and controlled visual variations.',
      },
      {
        title: 'Instruction writing',
        text: 'Edit instructions written in the style your model will receive.',
      },
      {
        title: 'QA',
        text: 'Every pair checked for alignment, artifacts and instruction match.',
      },
    ],
  },
  {
    slug: 'custom-data-collection',
    name: 'Custom Data Collection',
    image: '/v2/photos/crowd.webp',
    imageAlt: 'A crowd of people seen from behind',
    title: 'Custom data collection at scale',
    lead: 'One dataset specification, run across contributors, teams and countries.',
    text: 'We combine distributed contributors, controlled production and content licensing to collect the data your model needs — with rights, metadata and QA built into the pipeline.',
    description:
      'Custom data collection at scale: distributed contributors, controlled production, global teams, licensing, rights, metadata and QA by Kvet.',
    produce: [
      {
        title: 'Distributed contributors',
        text: 'People collecting data in their own homes, cities and workplaces.',
      },
      {
        title: 'Controlled production',
        text: 'Crews and studios for scenarios that need a set and a protocol.',
      },
      {
        title: 'Global teams',
        text: 'Local producers running the same spec across countries.',
      },
      {
        title: 'Content licensing',
        text: 'Existing content sourced and licensed when it is faster.',
      },
      {
        title: 'Rights management',
        text: 'Releases and usage terms that allow commercial training.',
      },
      {
        title: 'Metadata & annotation',
        text: 'Your schema applied consistently across every source.',
      },
    ],
    howLabel: 'How we scale it',
    how: [
      {
        title: 'Pilot first',
        text: 'A sample batch reviewed with your team before volume.',
      },
      {
        title: 'Recruitment',
        text: 'Contributors and performers selected for the diversity you need.',
      },
      {
        title: 'Repeatable pipeline',
        text: 'The same protocol, tools and checks in every location.',
      },
      {
        title: 'QA & delivery',
        text: 'Validation, documentation and delivery in your format.',
      },
    ],
  },
];
