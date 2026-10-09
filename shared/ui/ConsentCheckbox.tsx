import type { ReactNode } from 'react';
import { Flex, Link, chakra } from '@chakra-ui/react';
import { blue, inkSoft, pillBorder, textSoft } from '../theme/palette';

type Props = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  children: ReactNode;
};

/** Small square tick with a clickable label; used for the separate GDPR consents. */
export function ConsentCheckbox({ id, checked, onChange, required = false, children }: Props) {
  return (
    <Flex
      align='flex-start'
      gap={3}
      fontSize='12px'
      lineHeight='1.5'
      color={textSoft}
    >
      <chakra.input
        id={id}
        type='checkbox'
        checked={checked}
        required={required}
        onChange={(event) => onChange(event.target.checked)}
        flex='0 0 auto'
        w='16px'
        h='16px'
        mt='2px'
        appearance='none'
        borderWidth='1px'
        borderColor={pillBorder}
        bg={checked ? blue : inkSoft}
        cursor='pointer'
        css={{
          '&:checked': {
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path d='M3.5 8.5l3 3 6-7' fill='none' stroke='%230e0f13' stroke-width='2'/></svg>\")",
          },
          '&:focus-visible': { outline: `2px solid ${blue}`, outlineOffset: '2px' },
        }}
      />
      <chakra.label
        htmlFor={id}
        cursor='pointer'
      >
        {children}
      </chakra.label>
    </Flex>
  );
}

export function PrivacyLink() {
  return (
    <Link
      href='/privacy-policy'
      target='_blank'
      rel='noopener'
      color='white'
      textDecoration='underline'
      textUnderlineOffset='3px'
    >
      Privacy Policy
    </Link>
  );
}

type ConsentProps = {
  idPrefix: string;
  consent: boolean;
  marketing: boolean;
  onConsent: (value: boolean) => void;
  onMarketing: (value: boolean) => void;
};

/** The two separate consents: required (answering the enquiry) and optional (marketing e-mail). */
export function ConsentFields({
  idPrefix,
  consent,
  marketing,
  onConsent,
  onMarketing,
}: ConsentProps) {
  return (
    <Flex
      direction='column'
      gap={3}
      flex='1 1 320px'
      minW='0'
      maxW='520px'
    >
      <ConsentCheckbox
        id={`${idPrefix}-consent`}
        checked={consent}
        onChange={onConsent}
        required
      >
        I have read the <PrivacyLink /> and I agree that Kvetio may process my name, email address
        and the details I provide in this form in order to reply to my enquiry.
      </ConsentCheckbox>
      <ConsentCheckbox
        id={`${idPrefix}-marketing`}
        checked={marketing}
        onChange={onMarketing}
      >
        Optional: I agree to receive commercial information about Kvetio’s datasets and services at
        this email address. I can withdraw this consent at any time.
      </ConsentCheckbox>
    </Flex>
  );
}
