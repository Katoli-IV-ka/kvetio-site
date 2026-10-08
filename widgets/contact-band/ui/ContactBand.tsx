import { useState } from 'react';
import { Box, Flex, Heading, Link, Text, chakra } from '@chakra-ui/react';
import { ContactModal } from '../../../features/contact/ui/ContactModal';
import { hairline, ink, muted } from '../../../shared/theme/palette';
import { Flower } from '../../../shared/ui/Flower';

export function ContactBand() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      as='section'
      id='contact'
      bg={ink}
      px={{ base: 5, md: 16 }}
      pt={{ base: 14, md: 20 }}
      pb={10}
      borderTopWidth='1px'
      borderColor={hairline}
    >
      <Flex
        direction='column'
        gap={7}
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
        <Box>
          <chakra.button
            type='button'
            onClick={() => setOpen(true)}
            display='inline-flex'
            alignItems='center'
            h='44px'
            px={6}
            borderRadius='full'
            bg='white'
            fontSize='12px'
            fontWeight='600'
            color={ink}
            cursor='pointer'
          >
            Contact us
          </chakra.button>
        </Box>
        <Flex
          wrap='wrap'
          align='center'
          justify='space-between'
          gap={4}
          mt={10}
          pt={6}
          borderTopWidth='1px'
          borderColor={hairline}
          fontSize='12px'
          color={muted}
        >
          <Flex
            align='center'
            gap={2}
            color='white'
          >
            <Flower size={16} />
            <span>Kvetio</span>
          </Flex>
          <Flex
            gap={6}
            wrap='wrap'
          >
            <Link
              href='mailto:contact@kvet.io'
              color='inherit'
            >
              contact@kvet.io
            </Link>
            <Link
              href='https://www.linkedin.com/company/kvet-io'
              target='_blank'
              rel='noopener noreferrer'
              color='inherit'
            >
              LinkedIn
            </Link>
            <Link
              href='https://www.instagram.com/kvetio'
              target='_blank'
              rel='noopener noreferrer'
              color='inherit'
            >
              Instagram
            </Link>
          </Flex>
          <Text m='0'>© {new Date().getFullYear()} Kvetio</Text>
        </Flex>
      </Flex>
      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}
