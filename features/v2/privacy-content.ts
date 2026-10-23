export const PRIVACY_EMAIL = 'contact@kvet.io';
export const PRIVACY_UPDATED = '9 October 2026';

export type PolicySection = { id?: string; title: string; body: string[]; list?: string[] };

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    title: '1. Who we are',
    body: [
      `The controller of your personal data is Kvetio (“we”, “us”), a business based in Warsaw, Poland, operating the website kvet.io. You can contact us about anything in this policy at ${PRIVACY_EMAIL}.`,
    ],
  },
  {
    title: '2. What data we collect',
    body: ['We collect only what you type into our contact form:'],
    list: [
      'name and email address;',
      'job title and company name;',
      'the type of data you are interested in and the description of your request;',
      'how you heard about us.',
    ],
  },
  {
    id: 'processing',
    title: '3. Why we use it and on what legal basis',
    body: [
      'We process the data above for the following purposes (Regulation (EU) 2016/679, “GDPR”):',
    ],
    list: [
      'to reply to your inquiry and, if you wish, prepare a cooperation — Art. 6(1)(b) GDPR (steps taken at your request before a contract) and your consent given by ticking the box next to the form, Art. 6(1)(a) GDPR;',
      'to send you commercial information about our datasets and services by email — only if you tick the separate, optional box next to the form — Art. 6(1)(a) GDPR and Art. 398 of the Polish Electronic Communications Law (Prawo komunikacji elektronicznej);',
      'to keep business correspondence, protect the website against abuse and defend against or pursue legal claims — our legitimate interest, Art. 6(1)(f) GDPR.',
    ],
  },
  {
    title: '4. Who receives your data',
    body: [
      'We do not use a CRM system, we do not sell your data, we do not use it for advertising and we do not share it with third parties for their own purposes. Your inquiry is only delivered to our team.',
      'To deliver it we rely on service providers that process data strictly on our behalf and under their data-processing terms: an email service (Google Workspace / Gmail), a messenger used for an internal notification about a new inquiry (Telegram) and the hosting platform of this website (Vercel). We may also disclose data where a law or a competent authority requires it.',
    ],
  },
  {
    title: '5. Transfers outside the European Economic Area',
    body: [
      'Some of the providers above are based in or may access data from outside the EEA, including the United States. Such transfers rely on the European Commission’s adequacy decision (EU–US Data Privacy Framework) or on standard contractual clauses.',
    ],
  },
  {
    title: '6. How long we keep it',
    body: [
      'We keep your inquiry for as long as needed to handle it and for up to 12 months after our last contact, unless we start working together (then for the duration of the contract and the limitation period for related claims) or the law requires a longer period. Data processed for the optional marketing consent is kept until you withdraw it. When you give us the consents we record the date and time of the consent and the version of this policy as proof.',
    ],
  },
  {
    title: '7. Your rights',
    body: ['You have the right to:'],
    list: [
      'access your data and receive a copy of it;',
      'have it corrected or completed;',
      'have it erased (“right to be forgotten”) or its processing restricted;',
      'receive it in a portable format;',
      'object to processing based on our legitimate interest;',
      'withdraw either of your consents at any time (for example by writing to us or using the unsubscribe link) — this does not affect the lawfulness of processing before the withdrawal.',
    ],
  },
  {
    title: '8. Complaints',
    body: [
      `To use any of these rights, write to ${PRIVACY_EMAIL}. You also have the right to lodge a complaint with the Polish supervisory authority — the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warsaw, uodo.gov.pl — or with the authority of your country of residence.`,
    ],
  },
  {
    title: '9. Two separate consents',
    body: [
      'The contact form contains two separate boxes, neither is ticked in advance. The first one (required to send the form) covers replying to your inquiry. The second one (optional) covers commercial emails; leaving it unticked has no effect on how we handle your inquiry.',
      'Giving us your data is voluntary, but without name, email and your request we are not able to answer you. We do not make decisions about you by automated means and we do not profile you.',
    ],
  },
  {
    title: '10. Cookies and browser storage',
    body: [
      'This website does not use analytics, advertising or tracking cookies. While you move from the first to the next step of the contact form your browser temporarily keeps the name and email you typed (session storage); it is removed when you send the form or close the tab.',
    ],
  },
  {
    id: 'security',
    title: '11. Security',
    body: [
      'We apply reasonable technical and organizational measures to protect your data, including encrypted connections (HTTPS), restricted access to the inbox where inquiries arrive and a limit on the number of form submissions.',
    ],
  },
  {
    title: '12. Changes to this policy',
    body: [
      'We may update this policy when our practices or the law change. The current version is always published on this page together with its date.',
    ],
  },
];
