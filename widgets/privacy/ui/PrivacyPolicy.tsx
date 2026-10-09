import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { hairline, ink, muted, textSoft } from '../../../shared/theme/palette';
import { SiteFooter } from '../../contact-band/ui/SiteFooter';
import { TopNav } from '../../contact-page/ui/ContactPage';

const EMAIL = 'contact@kvet.io';
const UPDATED = '9 October 2026';

type Section = { title: string; body: string[]; list?: string[] };

const sections: Section[] = [
  {
    title: '1. Who we are',
    body: [
      `The controller of your personal data is Kvetio (“we”, “us”), a business based in Warsaw, Poland, operating the website kvet.io. You can contact us about anything in this policy at ${EMAIL}.`,
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
    title: '3. Why we use it and on what legal basis',
    body: [
      'We process the data above for the following purposes (Regulation (EU) 2016/679, “GDPR”):',
    ],
    list: [
      'to reply to your enquiry and, if you wish, prepare a cooperation — Art. 6(1)(b) GDPR (steps taken at your request before a contract) and your consent given by ticking the box next to the form, Art. 6(1)(a) GDPR;',
      'to send you commercial information about our datasets and services by email — only if you tick the separate, optional box next to the form — Art. 6(1)(a) GDPR and Art. 398 of the Polish Electronic Communications Law (Prawo komunikacji elektronicznej);',
      'to keep business correspondence, protect the website against abuse and defend against or pursue legal claims — our legitimate interest, Art. 6(1)(f) GDPR.',
    ],
  },
  {
    title: '4. Who receives your data',
    body: [
      'We do not use a CRM system, we do not sell your data, we do not use it for advertising and we do not share it with third parties for their own purposes. Your enquiry is only delivered to our team.',
      'To deliver it we rely on service providers that process data strictly on our behalf and under their data-processing terms: an email service (Google Workspace / Gmail), a messenger used for an internal notification about a new enquiry (Telegram) and the hosting platform of this website (Vercel). We may also disclose data where a law or a competent authority requires it.',
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
      'We keep your enquiry for as long as needed to handle it and for up to 12 months after our last contact, unless we start working together (then for the duration of the contract and the limitation period for related claims) or the law requires a longer period. Data processed for the optional marketing consent is kept until you withdraw it. When you give us the consents we record the date and time of the consent and the version of this policy as proof.',
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
      `To use any of these rights, write to ${EMAIL}. You also have the right to lodge a complaint with the Polish supervisory authority — the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warsaw, uodo.gov.pl — or with the authority of your country of residence.`,
    ],
  },
  {
    title: '9. Two separate consents',
    body: [
      'The contact form contains two separate boxes, neither is ticked in advance. The first one (required to send the form) covers replying to your enquiry. The second one (optional) covers commercial emails; leaving it unticked has no effect on how we handle your enquiry.',
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
    title: '11. Security',
    body: [
      'We apply reasonable technical and organisational measures to protect your data, including encrypted connections (HTTPS), restricted access to the inbox where enquiries arrive and a limit on the number of form submissions.',
    ],
  },
  {
    title: '12. Changes to this policy',
    body: [
      'We may update this policy when our practices or the law change. The current version is always published on this page together with its date.',
    ],
  },
];

export function PrivacyPolicy() {
  return (
    <Box
      bg={ink}
      minH='100vh'
    >
      <Box px={{ base: 5, md: 16 }}>
        <TopNav />
        <Box
          as='main'
          maxW='1312px'
          mx='auto'
          pt={{ base: 14, md: 24 }}
          pb={{ base: 14, md: 24 }}
        >
          <Box maxW='760px'>
            <Heading
              as='h1'
              m='0'
              fontSize={{ base: '30px', md: '40px' }}
              lineHeight='1.08'
              fontWeight='500'
              letterSpacing='-0.01em'
              textTransform='uppercase'
              color='white'
            >
              Privacy Policy
            </Heading>
            <Text
              mt={5}
              mb={10}
              fontSize='13px'
              color={muted}
            >
              Last updated: {UPDATED}
            </Text>
            <Flex
              direction='column'
              gap={8}
              borderTopWidth='1px'
              borderColor={hairline}
              pt={8}
            >
              {sections.map((section) => (
                <Box key={section.title}>
                  <Heading
                    as='h2'
                    m='0'
                    mb={3}
                    fontSize='18px'
                    fontWeight='500'
                    color='white'
                  >
                    {section.title}
                  </Heading>
                  {section.body.map((paragraph) => (
                    <Text
                      key={paragraph}
                      m='0'
                      mb={3}
                      fontSize='14px'
                      lineHeight='1.65'
                      color={textSoft}
                    >
                      {paragraph}
                    </Text>
                  ))}
                  {section.list && (
                    <Box
                      as='ul'
                      m='0'
                      pl={5}
                      fontSize='14px'
                      lineHeight='1.65'
                      color={textSoft}
                    >
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
              <Text
                m='0'
                fontSize='13px'
                color={muted}
              >
                Questions? Write to{' '}
                <Link
                  href={`mailto:${EMAIL}`}
                  color='white'
                >
                  {EMAIL}
                </Link>
                .
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
      <SiteFooter />
    </Box>
  );
}
