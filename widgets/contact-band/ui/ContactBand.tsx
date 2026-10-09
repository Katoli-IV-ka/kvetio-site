import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, Input, chakra } from '@chakra-ui/react';
import { saveDraft } from '../../../features/contact/lib/draft';
import { hairline, ink, muted } from '../../../shared/theme/palette';
import { ConsentCheckbox } from '../../../shared/ui/ConsentCheckbox';
import { fieldProps } from '../../../shared/ui/formStyles';

export function ContactBand() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  // Nothing is sent from here: the two answers are only carried to the full form.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDraft({ name: name.trim(), email: email.trim(), consent });
    void router.push('/contact');
  };

  return (
    <Box
      as='section'
      id='contact'
      bg={ink}
      px={{ base: 5, md: 16 }}
      py={{ base: 14, md: 24 }}
      borderTopWidth='1px'
      borderColor={hairline}
    >
      <Flex
        direction='column'
        gap={8}
        maxW='1312px'
        mx='auto'
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
              gridTemplateColumns={{ base: '1fr', md: '1fr 1fr auto' }}
              gap={3}
            >
              <Input
                {...fieldProps}
                name='name'
                aria-label='Name'
                placeholder='Name'
                autoComplete='name'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              <Input
                {...fieldProps}
                name='email'
                type='email'
                aria-label='Email'
                placeholder='Email'
                autoComplete='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <chakra.button
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
            </Box>
            <ConsentCheckbox
              id='band-consent'
              checked={consent}
              onChange={setConsent}
            />
            <Box
              m='0'
              fontSize='11px'
              color={muted}
            >
              We only use these details to reply to you.
            </Box>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
}
