import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, chakra } from '@chakra-ui/react';
import { saveDraft } from '../../../features/contact/lib/draft';
import { ink } from '../../../shared/theme/palette';
import { ConsentFields } from '../../../shared/ui/ConsentCheckbox';
import { LineInput } from '../../../shared/ui/LineField';

export function ContactBand() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Nothing is sent from here: the two answers are only carried to the full form.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDraft({ name: name.trim(), email: email.trim(), consent, marketing });
    void router.push('/contact');
  };

  return (
    <Box
      as='section'
      id='contact'
      bg={ink}
      py={{ base: 14, md: 24 }}
    >
      {/* Gradient frame in the photo's colours, photo (blurred, turned landscape) inside. */}
      <Box
        w='100%'
        p={{ base: '5px', md: '7px' }}
        background='linear-gradient(105deg,#3f6aa6 0%,#233a59 28%,#c9ad8a 62%,#8c8578 82%,#d8bf9c 100%)'
      >
        <Box
          position='relative'
          overflow='hidden'
          bg='#233a59'
          px={{ base: 5, md: 'max(64px, calc((100vw - 1312px) / 2))' }}
          py={{ base: 10, md: 16 }}
        >
          <Box
            aria-hidden='true'
            position='absolute'
            inset='0'
            backgroundImage="url('/images/v2/contact-sky.jpg')"
            backgroundSize='cover'
            backgroundPosition='center'
          />
          <Box
            aria-hidden='true'
            position='absolute'
            inset='0'
            bg='linear-gradient(90deg,rgba(8,12,22,.55) 0%,rgba(8,12,22,.4) 62%,rgba(8,12,22,.3) 100%)'
          />
          <Flex
            position='relative'
            direction='column'
            gap={8}
          >
            <Heading
              as='h2'
              m='0'
              maxW='640px'
              fontSize={{ base: '30px', md: '40px' }}
              lineHeight='1.08'
              fontWeight='500'
              letterSpacing='-0.01em'
              textTransform='uppercase'
              color='white'
            >
              Tell us what your model is missing
            </Heading>
            <form onSubmit={handleSubmit}>
              <Flex
                direction='column'
                gap={5}
                maxW='760px'
              >
                <Box
                  display='grid'
                  gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
                  columnGap={10}
                  rowGap={2}
                >
                  <LineInput
                    id='band-name'
                    name='name'
                    label='Name'
                    autoComplete='name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                  <LineInput
                    id='band-email'
                    name='email'
                    type='email'
                    label='Email'
                    autoComplete='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Box>
                <Flex
                  align='flex-end'
                  justify='space-between'
                  gap={6}
                  wrap='wrap'
                >
                  <ConsentFields
                    idPrefix='band'
                    consent={consent}
                    marketing={marketing}
                    onConsent={setConsent}
                    onMarketing={setMarketing}
                  />
                  <chakra.button
                    ml='auto'
                    type='submit'
                    display='inline-flex'
                    alignItems='center'
                    justifyContent='center'
                    h='48px'
                    px={8}
                    borderRadius='full'
                    bg='white'
                    color={ink}
                    fontSize='12px'
                    fontWeight='600'
                    cursor='pointer'
                  >
                    Let’s talk
                  </chakra.button>
                </Flex>
              </Flex>
            </form>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
