import type { GetStaticPaths, GetStaticProps } from 'next';
import { BRAND } from '../features/v2/content';
import { LANDINGS, type Landing } from '../features/v2/landings';
import { LandingPage } from '../features/v2/ui/LandingPage';
import { SiteHead } from '../features/v2/ui/SiteHead';

type Props = { landing: Landing };

export const getStaticPaths: GetStaticPaths = () => ({
  paths: LANDINGS.map((landing) => ({ params: { landing: landing.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const landing = LANDINGS.find((item) => item.slug === params?.landing);
  return landing ? { props: { landing } } : { notFound: true };
};

export default function SolutionPage({ landing }: Props) {
  return (
    <>
      <SiteHead
        title={`${landing.title} — ${BRAND}`}
        description={landing.description}
        path={`/${landing.slug}`}
      />
      <LandingPage landing={landing} />
    </>
  );
}
