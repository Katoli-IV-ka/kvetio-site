/* eslint-disable @next/next/no-page-custom-font -- fonts are shared with the home page */
import Head from 'next/head';
import { LegalNoticePageV2 } from '../features/v2/ui/LegalNoticePageV2';

export default function LegalNoticePage() {
  return (
    <>
      <Head>
        <title>Legal Notice — Kvet</title>
        <meta
          name='description'
          content='Who runs the Kvet website, what the website is and is not, how the contact form works, complaints and applicable law.'
        />
        <link
          rel='canonical'
          href='https://kvet.io/legal-notice'
        />
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Cousine:wght@400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap'
        />
        <style>{`html, body { margin: 0; background: #fff; }`}</style>
      </Head>
      <LegalNoticePageV2 />
    </>
  );
}
