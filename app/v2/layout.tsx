import { Inter_Tight } from 'next/font/google';

// Inter Tight is only used by the alternative design, so it is loaded in this route's layout
// and is not preloaded on the main page.
const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

export default function V2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={interTight.variable}>{children}</div>;
}
