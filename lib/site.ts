export const siteConfig = {
  name: 'Kvetio',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kvet.io',
  email: 'contact@kvet.io',
  title: 'Kvetio — Oddly specific training data',
  description:
    "We shoot training data that doesn't exist yet — for your model only. Licensing & creating custom datasets for AI & ML teams worldwide.",
  social: {
    linkedin: 'https://www.linkedin.com/company/kvet-io',
    instagram: 'https://www.instagram.com/kvetio',
  },
} as const;
