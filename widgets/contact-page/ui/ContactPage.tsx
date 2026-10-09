import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Box, Flex, Heading, Link, Text, chakra } from '@chakra-ui/react';
import { clearDraft, loadDraft } from '../../../features/contact/lib/draft';
import { contactForm, navLinks } from '../../../shared/landing/site-content';
import { ConsentFields } from '../../../shared/ui/ConsentCheckbox';
import { LineInput, LineSelect, LineTextarea } from '../../../shared/ui/LineField';
import {
  blue,
  cream,
  hairline,
  ink,
  inkSoft,
  muted,
  pillBorder,
} from '../../../shared/theme/palette';
import { Flower } from '../../../shared/ui/Flower';
import { SiteFooter } from '../../contact-band/ui/SiteFooter';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'ratelimit';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <Flex
      direction='column'
      gap={2}
      minW='0'
    >
      <chakra.label
        htmlFor={htmlFor}
        fontSize='11px'
        fontWeight='500'
        letterSpacing='0.08em'
        textTransform='uppercase'
        color={muted}
      >
        {label}
        <span aria-hidden='true'>*</span>
      </chakra.label>
      {children}
    </Flex>
  );
}

export const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Flex
      as='nav'
      aria-label='Primary'
      wrap='wrap'
      align='center'
      justify={{ base: 'space-between', md: 'flex-start' }}
      gap='20px 36px'
      maxW='1312px'
      mx='auto'
      pt={10}
    >
      <Link
        href='/'
        aria-label='Kvetio home'
        display='flex'
        alignItems='center'
        gap={3}
        fontSize='13px'
        fontWeight='500'
        color='white'
        _hover={{ textDecoration: 'none' }}
      >
        <Flower size={22} />
        <span>Kvetio</span>
      </Link>
      <chakra.button
        type='button'
        display={{ base: 'inline-flex', md: 'none' }}
        alignItems='center'
        justifyContent='center'
        w='40px'
        h='40px'
        color='white'
        cursor='pointer'
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <svg
          width='22'
          height='22'
          viewBox='0 0 22 22'
          fill='none'
          aria-hidden='true'
        >
          <path
            d={menuOpen ? 'M5 5L17 17M17 5L5 17' : 'M3 6H19M3 11H19M3 16H19'}
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
          />
        </svg>
      </chakra.button>
      <Flex
        display={{ base: menuOpen ? 'flex' : 'none', md: 'flex' }}
        direction={{ base: 'column', md: 'row' }}
        w={{ base: '100%', md: 'auto' }}
        wrap='wrap'
        align={{ base: 'flex-start', md: 'center' }}
        gap={{ base: 5, md: '12px 26px' }}
        fontSize={{ base: '14px', md: '11px' }}
        color='#9aa1b0'
        bg={{ base: 'rgba(14,15,19,0.92)', md: 'transparent' }}
        p={{ base: 4, md: 0 }}
      >
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            color={item.href === '/contact' ? 'white' : 'inherit'}
            _hover={{ textDecoration: 'none', color: 'white' }}
          >
            {item.label}
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

const STEPS = ['contact', 'request'] as const;

type Values = {
  name: string;
  email: string;
  consent: boolean;
  marketing: boolean;
  jobTitle: string;
  company: string;
  dataTypes: string[];
  message: string;
  source: string;
};

const EMPTY: Values = {
  name: '',
  email: '',
  consent: false,
  marketing: false,
  jobTitle: '',
  company: '',
  dataTypes: [],
  message: '',
  source: '',
};

export function ContactPage() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [typeError, setTypeError] = useState(false);

  // Answers given in the landing band are already here: jump to the second step.
  useEffect(() => {
    const draft = loadDraft();
    if (!draft) return;
    // sessionStorage is only readable on the client, so restore after hydration.
    queueMicrotask(() => {
      setValues((current) => ({ ...current, ...draft }));
      if (draft.name && draft.email && draft.consent) setStep(1);
    });
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const toggleType = (type: string) => {
    setTypeError(false);
    set(
      'dataTypes',
      values.dataTypes.includes(type)
        ? values.dataTypes.filter((item) => item !== type)
        : [...values.dataTypes, type],
    );
  };

  const submit = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          jobTitle: values.jobTitle,
          company: values.company,
          email: values.email,
          dataTypes: values.dataTypes,
          message: values.message,
          source: values.source,
          marketingConsent: values.marketing,
        }),
      });
      if (res.ok) clearDraft();
      setStatus(res.ok ? 'success' : res.status === 429 ? 'ratelimit' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === STEPS.length - 1 && values.dataTypes.length === 0) {
      setTypeError(true);
      return;
    }
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    void submit();
  };

  const last = step === STEPS.length - 1;

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
          <Box maxW='640px'>
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
              {contactForm.title}
            </Heading>
            {status !== 'success' && (
              <Flex
                role='progressbar'
                aria-label='Form progress'
                aria-valuemin={1}
                aria-valuemax={STEPS.length}
                aria-valuenow={step + 1}
                gap={1}
                mt={6}
                mb={10}
              >
                {STEPS.map((label, index) => (
                  <Box
                    key={label}
                    flex='1'
                    h='2px'
                    bg={index <= step ? blue : hairline}
                  />
                ))}
              </Flex>
            )}

            {status === 'success' ? (
              <Box
                role='status'
                mt={6}
              >
                <Text
                  m='0'
                  fontSize='22px'
                  fontWeight='500'
                  color={cream}
                >
                  Thank you — message received.
                </Text>
                <Text
                  mt={3}
                  fontSize='14px'
                  color={muted}
                >
                  We’ll get back to you soon.
                </Text>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Flex
                  direction='column'
                  gap={6}
                >
                  {step === 0 && (
                    <>
                      <LineInput
                        id='cf-name'
                        name='name'
                        label='Name'
                        autoComplete='name'
                        value={values.name}
                        onChange={(event) => set('name', event.target.value)}
                        required
                      />
                      <LineInput
                        id='cf-email'
                        name='email'
                        type='email'
                        label='Email'
                        autoComplete='email'
                        value={values.email}
                        onChange={(event) => set('email', event.target.value)}
                        required
                      />
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <LineInput
                        id='cf-title'
                        name='jobTitle'
                        label='Job title'
                        autoComplete='organization-title'
                        value={values.jobTitle}
                        onChange={(event) => set('jobTitle', event.target.value)}
                        required
                      />
                      <LineInput
                        id='cf-company'
                        name='company'
                        label='Company name'
                        autoComplete='organization'
                        value={values.company}
                        onChange={(event) => set('company', event.target.value)}
                        required
                      />
                      <Box
                        as='fieldset'
                        m='0'
                        p='0'
                        border='0'
                        minW='0'
                      >
                        <Field label='Data type needed'>
                          <Text
                            m='0'
                            fontSize='12px'
                            color='#5d6472'
                          >
                            Check all that apply
                          </Text>
                          <Flex
                            wrap='wrap'
                            gap={2}
                          >
                            {contactForm.dataTypes.map((type) => {
                              const active = values.dataTypes.includes(type);
                              return (
                                <chakra.label
                                  key={type}
                                  display='inline-flex'
                                  alignItems='center'
                                  h='40px'
                                  px={4}
                                  borderWidth='1px'
                                  borderColor={active ? blue : pillBorder}
                                  bg={active ? blue : inkSoft}
                                  color={active ? ink : 'white'}
                                  fontSize='12px'
                                  fontWeight={active ? 600 : 500}
                                  cursor='pointer'
                                  css={{
                                    '&:has(:focus-visible)': { outline: `2px solid ${cream}` },
                                  }}
                                >
                                  <input
                                    type='checkbox'
                                    name='dataType'
                                    value={type}
                                    checked={active}
                                    onChange={() => toggleType(type)}
                                    style={{
                                      position: 'absolute',
                                      opacity: 0,
                                      width: 1,
                                      height: 1,
                                      pointerEvents: 'none',
                                    }}
                                  />
                                  {type}
                                </chakra.label>
                              );
                            })}
                          </Flex>
                          {typeError && (
                            <Text
                              role='alert'
                              m='0'
                              fontSize='12px'
                              color='#e07a6a'
                            >
                              Select at least one data type.
                            </Text>
                          )}
                        </Field>
                      </Box>
                      <LineTextarea
                        id='cf-message'
                        name='message'
                        label='Describe your request'
                        value={values.message}
                        onChange={(event) => set('message', event.target.value)}
                        required
                      />
                      <LineSelect
                        id='cf-source'
                        name='source'
                        label='How did you hear about us?'
                        value={values.source}
                        onChange={(event) => set('source', event.target.value)}
                        required
                      >
                        <option
                          value=''
                          disabled
                        >
                          Select…
                        </option>
                        {contactForm.sources.map((item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </LineSelect>
                    </>
                  )}

                  <Flex
                    align={step === 0 ? 'flex-end' : 'center'}
                    justify='space-between'
                    gap={4}
                    wrap='wrap'
                    pt={2}
                  >
                    {step === 0 ? (
                      <ConsentFields
                        idPrefix='cf'
                        consent={values.consent}
                        marketing={values.marketing}
                        onConsent={(checked) => set('consent', checked)}
                        onMarketing={(checked) => set('marketing', checked)}
                      />
                    ) : (
                      <chakra.button
                        type='button'
                        onClick={() => setStep(step - 1)}
                        h='44px'
                        px={6}
                        borderRadius='full'
                        borderWidth='1px'
                        borderColor='rgba(255,255,255,0.35)'
                        color='white'
                        fontSize='12px'
                        fontWeight='600'
                        cursor='pointer'
                      >
                        Back
                      </chakra.button>
                    )}
                    <chakra.button
                      type='submit'
                      disabled={status === 'loading'}
                      display='inline-flex'
                      alignItems='center'
                      h='44px'
                      px={8}
                      ml='auto'
                      borderRadius='full'
                      bg='white'
                      color={ink}
                      fontSize='12px'
                      fontWeight='600'
                      cursor='pointer'
                      opacity={status === 'loading' ? 0.6 : 1}
                    >
                      {status === 'loading' ? 'Sending…' : last ? 'Submit' : 'Continue'}
                    </chakra.button>
                    {status === 'error' && (
                      <Text
                        role='alert'
                        m='0'
                        fontSize='12px'
                        color='#e07a6a'
                      >
                        Something went wrong. Please try again or write to contact@kvet.io.
                      </Text>
                    )}
                    {status === 'ratelimit' && (
                      <Text
                        role='alert'
                        m='0'
                        fontSize='12px'
                        color='#e07a6a'
                      >
                        Too many requests. Please try again later.
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </form>
            )}
          </Box>
        </Box>
      </Box>
      <SiteFooter />
    </Box>
  );
}
