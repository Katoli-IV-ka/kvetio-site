export const PRIVACY_EMAIL = 'contact@kvet.io';
export const PRIVACY_UPDATED = '3 November 2026';

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
    body: [
      'We collect only what you type into our contact form. The form has two steps: we receive your data as soon as you submit the first step, and the second step is optional and adds details to the same request.',
      'Like every website, our hosting provider processes technical data needed to deliver the pages and protect them, such as your IP address and the time of the request. We also keep your IP address in the server memory for about 10 minutes to limit the number of form submissions; it is not saved in our inquiry records.',
    ],
    list: [
      'name and email address;',
      'the description of your request;',
      'optionally: job title and company name, the type of data you are interested in, the scale and timeline of the project, whether you need an NDA;',
      'optionally: how you heard about us.',
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
      'We do not use a CRM system, we do not sell your data, we do not use it for advertising and we do not share it with third parties for their own purposes. We may disclose data where a law or a competent authority requires it. Your inquiry is delivered to our team through the following providers:',
    ],
    list: [
      'email: Google Workspace / Gmail, which processes data on our behalf under its data-processing terms;',
      'website hosting: Vercel, which processes technical data on our behalf under its data-processing terms;',
      'Telegram: we receive a notification about each inquiry in a private Telegram chat that only authorised members of our team can read. It contains the data you entered in the form (name, email, the details of your request and the optional details you add). Telegram is operated by Telegram FZ-LLC (United Arab Emirates) and its group companies and handles messages under its own terms and privacy policy (telegram.org/privacy). We have no separate data-processing agreement with Telegram;',
      'analytics, only if you accept it in the cookie banner: Microsoft Clarity (Microsoft Corporation), see section 10.',
    ],
  },
  {
    title: '5. Transfers outside the European Economic Area',
    body: [
      'Some of the providers above are based in or may access data from outside the EEA. Transfers to Google, Vercel and Microsoft (United States) rely on the European Commission’s adequacy decision (EU–US Data Privacy Framework) or on standard contractual clauses.',
      'Telegram is based outside the EEA (the United Arab Emirates, with group companies in the British Virgin Islands). There is no European Commission adequacy decision for these countries and we have not concluded standard contractual clauses with Telegram ourselves. For this reason we limit what reaches Telegram to the notification about your inquiry, keep it in a private chat with restricted access protected by two-factor authentication, and delete it once it is no longer needed (see section 6). If you prefer that your data does not reach Telegram, write to us instead of using the form.',
    ],
  },
  {
    title: '6. How long we keep it',
    body: [
      'We keep your inquiry for as long as needed to handle it and for up to 12 months after our last contact, unless we start working together (then for the duration of the contract and the limitation period for related claims) or the law requires a longer period. Data processed for the optional marketing consent is kept until you withdraw it. The notification in Telegram is deleted from the chat together with the inquiry, at the latest when the period above ends. When you give us the consents we record the date and time of the consent and the version of this policy as proof.',
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
      'If you submit only the first step of the form, we process the name, email and request you provided in it on the same basis; the second step is optional. Giving us your data is voluntary, but without name, email and your request we are not able to answer you. We do not make decisions about you by automated means and we do not profile you.',
    ],
  },
  {
    id: 'cookies',
    title: '10. Cookies, analytics and browser storage',
    body: [
      'The website needs no cookies to work. Optional analytics runs only with your consent: when you first visit (and again after a year) a banner asks whether you accept analytics. Nothing is loaded before you choose, and nothing is loaded if you reject. You can change your choice at any time with the “Cookie settings” link in the footer; withdrawing consent switches analytics off and removes its cookies. The legal basis is your consent, Art. 6(1)(a) GDPR and the Polish Electronic Communications Law.',
      'The analytics tool is Microsoft Clarity, operated by Microsoft Corporation. If you accept, it records how the site is used (pages visited, clicks, scrolling and session replays) and sets its own cookies, such as _clck, which recognises a returning visitor, and _clsk, which joins page views into one session. The contents of the contact form fields are masked and are not visible in the replays. We never allow advertising storage: sharing Clarity data with Microsoft Advertising is switched off and no advertising cookies are used.',
      'While you fill in the contact form your browser may temporarily keep what you typed (session storage); it is removed when you send the form or close the tab.',
    ],
  },
  {
    id: 'security',
    title: '11. Security',
    body: [
      'We apply reasonable technical and organizational measures to protect your data, including encrypted connections (HTTPS), restricted access to the inbox and the private Telegram chat where inquiries arrive and a limit on the number of form submissions.',
    ],
  },
  {
    title: '12. Changes to this policy',
    body: [
      'We may update this policy when our practices or the law change. The current version is always published on this page together with its date.',
    ],
  },
];
