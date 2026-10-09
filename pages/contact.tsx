import Head from 'next/head';
import { ContactPage } from '../widgets/contact-page/ui/ContactPage';

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
      </Head>
      <ContactPage />
    </>
  );
}
