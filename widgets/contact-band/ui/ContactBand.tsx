import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, chakra } from '@chakra-ui/react';
import { saveDraft } from '../../../features/contact/lib/draft';
import { ink } from '../../../shared/theme/palette';
import { ConsentFields } from '../../../shared/ui/ConsentCheckbox';
import { LineInput } from '../../../shared/ui/LineField';

const HANDS_BORDER =
  'linear-gradient(105deg,#35b86a 0%,#1f6f45 24%,#d9483b 52%,#5a5fc4 76%,#e3d6b5 100%)';

const TITLE = 'Tell us what your model is missing';

function Title() {
  return (
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
      {TITLE}
    </Heading>
  );
}

function BandForm() {
  const idPrefix = 'band';
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
            id={`${idPrefix}-name`}
            name='name'
            label='Name'
            autoComplete='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <LineInput
            id={`${idPrefix}-email`}
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
          direction='row'
          align='flex-end'
          justify='space-between'
          gap={6}
          wrap='wrap'
        >
          <Box>
            <ConsentFields
              idPrefix={idPrefix}
              consent={consent}
              marketing={marketing}
              onConsent={setConsent}
              onMarketing={setMarketing}
            />
          </Box>
          <PillButton />
        </Flex>
      </Flex>
    </form>
  );
}

function PillButton() {
  return (
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
  );
}

export function ContactBand() {
  return (
    <Box
      as='section'
      id='contact'
      bg={ink}
      py={{ base: 14, md: 24 }}
    >
      {/* Gradient frame in the photo's colours, photo (blurred) inside, full width. */}
      <Box
        w='100%'
        p={{ base: '5px', md: '7px' }}
        background={HANDS_BORDER}
      >
        <Box
          position='relative'
          overflow='hidden'
          bg='#030304'
          px={{ base: 5, md: 'max(64px, calc((100vw - 1312px) / 2))' }}
          py={{ base: 10, md: 16 }}
        >
          <Box
            aria-hidden='true'
            position='absolute'
            top='50%'
            left={{ base: '50%', md: '74%' }}
            h={{ base: '100%', md: '200%' }}
            aspectRatio='1'
            transform='translate(-56%, -49%)'
            backgroundImage="url('/images/v2/contact-hands.jpg')"
            backgroundSize='100% 100%'
            css={{
              maskImage: 'radial-gradient(farthest-side at 56% 49%, #000 72%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(farthest-side at 56% 49%, #000 72%, transparent 100%)',
            }}
          />
          <Box
            aria-hidden='true'
            position='absolute'
            inset='0'
            bg={{
              base: 'rgba(3,3,4,.45)',
              md: 'linear-gradient(90deg,rgba(3,3,4,.5) 0%,rgba(3,3,4,0) 60%)',
            }}
          />
          <Flex
            position='relative'
            direction='column'
            gap={8}
          >
            <Title />
            <BandForm />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
