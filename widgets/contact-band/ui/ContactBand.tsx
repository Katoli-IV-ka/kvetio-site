import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, chakra } from '@chakra-ui/react';
import { saveDraft } from '../../../features/contact/lib/draft';
import { ink } from '../../../shared/theme/palette';
import { ConsentFields } from '../../../shared/ui/ConsentCheckbox';
import { LineInput } from '../../../shared/ui/LineField';

type Variant = 'sky' | 'hands' | 'button';

type Props = {
  variant?: Variant;
  /** Unique prefix for element ids when several bands are on one page (preview only). */
  idPrefix?: string;
};

const SKY_BORDER =
  'linear-gradient(105deg,#3f6aa6 0%,#233a59 28%,#c9ad8a 62%,#8c8578 82%,#d8bf9c 100%)';
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

function BandForm({ idPrefix, variant }: { idPrefix: string; variant: Variant }) {
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

  const wide = variant === 'button';

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction='column'
        gap={5}
        maxW={wide ? 'none' : '760px'}
      >
        <Box
          display='grid'
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          columnGap={10}
          rowGap={2}
          maxW={wide ? '760px' : 'none'}
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
          direction={wide ? 'column' : 'row'}
          align={wide ? 'stretch' : 'flex-end'}
          justify='space-between'
          gap={wide ? 8 : 6}
          wrap='wrap'
        >
          <Box css={wide ? { '& > div': { flexBasis: 'auto' } } : undefined}>
            <ConsentFields
              idPrefix={idPrefix}
              consent={consent}
              marketing={marketing}
              onConsent={setConsent}
              onMarketing={setMarketing}
            />
          </Box>
          {wide ? <HandsButton /> : <PillButton />}
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

/** Wide pill button: gradient frame, the touching hands inside with the spark centred, thin label. */
function HandsButton() {
  return (
    <chakra.button
      type='submit'
      display='block'
      w='100%'
      p={{ base: '4px', md: '6px' }}
      borderRadius='full'
      background={HANDS_BORDER}
      cursor='pointer'
      aria-label='Let’s talk'
      transition='filter .2s'
      _hover={{ filter: 'brightness(1.12)' }}
    >
      <Box
        position='relative'
        overflow='hidden'
        borderRadius='full'
        h={{ base: '104px', md: '160px' }}
        bg='#030304'
      >
        <Box
          aria-hidden='true'
          position='absolute'
          top='-150%'
          bottom='-150%'
          left='-45%'
          right='-45%'
          backgroundImage="url('/images/v2/contact-hands.jpg')"
          backgroundSize='100% auto'
          backgroundPosition='50% 49%'
          backgroundRepeat='no-repeat'
          transform='translateX(-6%) rotate(-7deg)'
        />
        <Flex
          position='relative'
          h='100%'
          align='center'
          justify='center'
          fontSize={{ base: '20px', md: '30px' }}
          fontWeight='200'
          letterSpacing='0.12em'
          textTransform='uppercase'
          color='white'
          textShadow='0 1px 14px rgba(0,0,0,.7)'
        >
          Let’s talk
        </Flex>
      </Box>
    </chakra.button>
  );
}

export function ContactBand({ variant = 'sky', idPrefix = 'band' }: Props) {
  const photo =
    variant === 'sky' ? (
      <>
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
      </>
    ) : (
      <>
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
      </>
    );

  if (variant === 'button') {
    return (
      <Box
        as='section'
        id={idPrefix === 'band' ? 'contact' : `contact-${idPrefix}`}
        bg='#000'
        px={{ base: 5, md: 16 }}
        py={{ base: 14, md: 24 }}
      >
        <Flex
          direction='column'
          gap={8}
          maxW='1312px'
          mx='auto'
        >
          <Title />
          <BandForm
            idPrefix={idPrefix}
            variant={variant}
          />
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      as='section'
      id={idPrefix === 'band' ? 'contact' : `contact-${idPrefix}`}
      bg={ink}
      py={{ base: 14, md: 24 }}
    >
      {/* Gradient frame in the photo's colours, photo (blurred) inside, full width. */}
      <Box
        w='100%'
        p={{ base: '5px', md: '7px' }}
        background={variant === 'sky' ? SKY_BORDER : HANDS_BORDER}
      >
        <Box
          position='relative'
          overflow='hidden'
          bg={variant === 'sky' ? '#233a59' : '#030304'}
          px={{ base: 5, md: 'max(64px, calc((100vw - 1312px) / 2))' }}
          py={{ base: 10, md: 16 }}
        >
          {photo}
          <Flex
            position='relative'
            direction='column'
            gap={8}
          >
            <Title />
            <BandForm
              idPrefix={idPrefix}
              variant={variant}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
