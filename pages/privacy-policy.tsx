/* eslint-disable @next/next/no-page-custom-font -- fonts are shared with the home page */
import Head from 'next/head';
import { PrivacyPageV2 } from '../features/v2/ui/PrivacyPageV2';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Kvet</title>
        <meta
          name='description'
          content='How Kvet processes personal data submitted through the contact form: purposes, legal bases, retention and your GDPR rights.'
        />
        <link
          rel='canonical'
          href='https://kvet.io/privacy-policy'
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
      <PrivacyPageV2 />
    </>
  );
}
