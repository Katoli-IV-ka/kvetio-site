/* eslint-disable @next/next/no-page-custom-font -- fonts are shared with /v2 */
import Head from 'next/head';
import { ContactPageV2 } from '../features/v2/ui/ContactPageV2';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact us — Kvetio</title>
        <meta
          name='description'
          content='Tell Kvetio what your model is missing: request custom AI training datasets across modalities, domains and formats.'
        />
        <link
          rel='canonical'
          href='https://kvet.io/contact'
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
      <ContactPageV2 />
    </>
  );
}
