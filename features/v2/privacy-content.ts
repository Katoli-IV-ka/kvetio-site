import { COMPANY } from './company';

export const PRIVACY_EMAIL = 'contact@kvet.io';
export const PRIVACY_UPDATED = '3 November 2026';

export type PolicySection = { id?: string; title: string; body: string[]; list?: string[] };

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    title: '1. Who we are',
    body: [
      `The controller of your personal data is ${COMPANY.legalName} (“Kvet”, “we”, “us”), a Polish limited liability company (KRS ${COMPANY.krs}, NIP ${COMPANY.nip}), operating the website kvet.io. You can contact us about anything in this policy at ${PRIVACY_EMAIL}.`,
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
      'a messaging service for internal notifications: our team receives a notification about each inquiry in a private channel that only authorised members of the team can read. It contains the data you entered in the form. The provider acts under its own terms and privacy policy;',
      'analytics, only if you accept it in the cookie banner: Microsoft Clarity (Microsoft Corporation), see section 10.',
    ],
  },
  {
    title: '5. Transfers outside the European Economic Area',
    body: [
      'Some of the providers above are based in or may access data from outside the EEA. Transfers to Google, Vercel and Microsoft (United States) rely on the European Commission’s adequacy decision (EU–US Data Privacy Framework) or on standard contractual clauses.',
      'The messaging service used for internal notifications is provided from outside the EEA. There is no European Commission adequacy decision for it and we have no separate standard contractual clauses with its provider. For this reason we limit what reaches it to the notification about your inquiry, keep it in a private channel with restricted access protected by two-factor authentication, and delete it once it is no longer needed (see section 6). If you prefer that your data does not reach it, write to us instead of using the form.',
    ],
  },
  {
    title: '6. How long we keep it',
    body: [
      'We keep your inquiry for as long as needed to handle it and for up to 12 months after our last contact, unless we start working together (then for the duration of the contract and the limitation period for related claims) or the law requires a longer period. The internal notification is deleted together with the inquiry, at the latest when the period above ends. When you give us your consent we record the date and time of the consent and the version of this policy as proof.',
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
      'withdraw your consent at any time by writing to us — this does not affect the lawfulness of processing before the withdrawal.',
    ],
  },
  {
    title: '8. Complaints',
    body: [
      `To use any of these rights, write to ${PRIVACY_EMAIL}. You also have the right to lodge a complaint with the Polish supervisory authority — the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warsaw, uodo.gov.pl — or with the authority of your country of residence.`,
    ],
  },
  {
    title: '9. Consent and the form',
    body: [
      'The contact form contains one box, which is not ticked in advance and is required to send the form. It covers replying to your inquiry. We do not send newsletters or commercial emails and we do not use your data for marketing.',
      'If you submit only the first step of the form, we process the name, email and request you provided in it on the same basis; the second step is optional. Giving us your data is voluntary, but without name, email and your request we are not able to answer you. We do not make decisions about you by automated means and we do not profile you.',
    ],
  },
  {
    id: 'cookies',
    title: '10. Cookies, analytics and browser storage',
    body: [
      'The website needs no cookies to work. Optional analytics runs only with your consent: when you first visit (and again after a year) a banner asks whether you accept analytics. Nothing is loaded before you choose, and nothing is loaded if you reject. You can change your choice at any time with the “Cookie settings” link in the footer; withdrawing consent switches analytics off and removes its cookies. The legal basis is your consent, Art. 6(1)(a) GDPR and the Polish Electronic Communications Law.',
      'The analytics tool is Microsoft Clarity, operated by Microsoft Corporation. If you accept, it records how the site is used (pages visited, clicks, scrolling and session replays) and sets its own cookies, such as _clck, which recognises a returning visitor and is kept for up to 13 months, and _clsk, which joins page views into one session and is kept for up to one day. The contents of the contact form fields are masked and are not visible in the replays. We never allow advertising storage: sharing Clarity data with Microsoft Advertising is switched off and no advertising cookies are used.',
      'While you fill in the contact form your browser may temporarily keep what you typed (session storage); it is removed when you send the form or close the tab.',
    ],
  },
  {
    id: 'security',
    title: '11. Security',
    body: [
      'We apply reasonable technical and organizational measures to protect your data, including encrypted connections (HTTPS), restricted access to the inbox and the private channel where inquiries arrive and a limit on the number of form submissions.',
    ],
  },
  {
    title: '12. Changes to this policy',
    body: [
      'We may update this policy when our practices or the law change. The current version is always published on this page together with its date.',
    ],
  },
];
