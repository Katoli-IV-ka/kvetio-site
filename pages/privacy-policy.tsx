import Head from 'next/head';
import { PrivacyPolicy } from '../widgets/privacy/ui/PrivacyPolicy';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Kvetio</title>
        <meta
          name='description'
          content='How Kvetio processes personal data submitted through the contact form: purposes, legal bases, retention and your GDPR rights.'
        />
        <link
          rel='canonical'
          href='https://kvet.io/privacy-policy'
        />
      </Head>
      <PrivacyPolicy />
    </>
  );
}
