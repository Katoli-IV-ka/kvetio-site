import { COMPANY } from './company';
import { PRIVACY_EMAIL, type PolicySection } from './privacy-content';

export const LEGAL_NOTICE_UPDATED = '3 November 2026';

export const LEGAL_NOTICE_SECTIONS: PolicySection[] = [
  {
    title: '1. Who runs this website',
    body: [
      `The website kvet.io is run by ${COMPANY.legalName} (“Kvet”, “we”), registered office in ${COMPANY.seat}, Poland, KRS ${COMPANY.krs}, NIP ${COMPANY.nip}, share capital ${COMPANY.shareCapital}. Contact: ${PRIVACY_EMAIL}.`,
    ],
  },
  {
    title: '2. Information only',
    body: [
      'This website presents what Kvet does. The information on it is general and does not constitute an offer within the meaning of Article 66 of the Polish Civil Code or any other binding offer. Descriptions of datasets, capabilities and processes are illustrative and may change without notice.',
    ],
  },
  {
    title: '3. How we work with clients',
    body: [
      'Cooperation is agreed individually. The scope of work, price, rights to the data, delivery and other terms are set out in a separate written agreement with the client. Nothing on this website replaces such an agreement or creates an obligation to enter into one.',
    ],
  },
  {
    title: '4. Contact form',
    body: [
      'The form is a way to send us a business inquiry. Sending it does not create a contract and does not oblige us to reply or to cooperate. Please do not use it to send unlawful content, spam or automated requests.',
      'Please do not put confidential information or sensitive data in the form. If your project requires it, tell us in the form and we will agree on an NDA before you share details.',
      'We process the data you send as described in the Privacy Policy.',
    ],
  },
  {
    title: '5. Using the website',
    body: [
      'The website is free and needs no account. It works in a current browser with JavaScript enabled (the contact form needs it). We may change it, or interrupt access to it, at any time.',
    ],
  },
  {
    title: '6. Content and copyright',
    body: [
      'The texts, graphics, images and logos on this website are protected by law. They may not be copied, published or used commercially without our prior consent, except as the law allows.',
    ],
  },
  {
    title: '7. Liability',
    body: [
      'To the extent permitted by law, we are not liable for interruptions in the availability of the website or for the content and availability of external websites it links to.',
    ],
  },
  {
    title: '8. Complaints',
    body: [
      `If you have a complaint about how this website works, write to ${PRIVACY_EMAIL} and describe the problem. We will reply within 14 days.`,
    ],
  },
  {
    title: '9. Personal data, cookies and governing law',
    body: [
      'How we process personal data and which cookies we use is described in the Privacy Policy. This notice is governed by Polish law. We may update it; the current version is always published on this page together with its date.',
    ],
  },
];
