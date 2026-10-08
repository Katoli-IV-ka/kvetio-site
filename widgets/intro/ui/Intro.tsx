import { useState } from 'react';
import { Box, Flex, Heading, Image, Link, Text, chakra } from '@chakra-ui/react';
import { ContactModal } from '../../../features/contact/ui/ContactModal';
import { FLOWER_PATH } from '../../../shared/landing/geometry';
import { introCopy, navLinks } from '../../../shared/landing/site-content';
import { cream, ink, muted, pillBg, pillBorder } from '../../../shared/theme/palette';
import { Flower } from '../../../shared/ui/Flower';

function Chevron() {
  return (
    <svg
      width='8'
      height='8'
      viewBox='0 0 8 8'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M1 2.5L4 5.5L7 2.5'
        stroke='#9aa1b0'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function Intro() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <Flex
      as='header'
      wrap='wrap'
      align='stretch'
      bg={ink}
      overflow='hidden'
      minH={{ base: 'auto', md: '800px' }}
    >
      <Flex
        direction='column'
        flex='1 1 520px'
        minW='0'
        px={{ base: 5, md: 16 }}
        pt={10}
        bg={ink}
      >
        <Flex
          as='nav'
          aria-label='Primary'
          wrap='wrap'
          align='center'
          gap='20px 36px'
        >
          <Link
            href='#'
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
          <Flex
            wrap='wrap'
            align='center'
            gap='12px 26px'
            fontSize='11px'
            color='#9aa1b0'
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                display='flex'
                alignItems='center'
                gap='5px'
                color='inherit'
                _hover={{ textDecoration: 'none', color: 'white' }}
              >
                {item.label}
                <Chevron />
              </Link>
            ))}
          </Flex>
        </Flex>

        <Flex
          direction='column'
          justify='center'
          flex='1 1 auto'
          gap={6}
          py={{ base: 16, md: '80px' }}
          pb={{ base: 16, md: '96px' }}
          maxW='420px'
        >
          <Heading
            as='h1'
            m='0'
            fontSize='40px'
            lineHeight='1.08'
            fontWeight='500'
            letterSpacing='-0.01em'
            textTransform='uppercase'
            color='white'
          >
            {introCopy.title}
          </Heading>
          <Text
            m='0'
            fontSize='13px'
            lineHeight='1.55'
            color={muted}
            maxW='340px'
          >
            {introCopy.description}
          </Text>
          <Flex
            wrap='wrap'
            align='center'
            gap={3}
            mt={1.5}
          >
            <Link
              href='#cases'
              display='inline-flex'
              alignItems='center'
              justifyContent='center'
              h='44px'
              px={5}
              borderRadius='full'
              bg={pillBg}
              borderWidth='1px'
              borderColor={pillBorder}
              fontSize='11px'
              fontWeight='500'
              color='white'
              _hover={{ textDecoration: 'none', borderColor: '#3a3d45' }}
            >
              Specifications
            </Link>
            <chakra.button
              type='button'
              onClick={() => setContactOpen(true)}
              display='inline-flex'
              alignItems='center'
              gap='14px'
              h='44px'
              pl='18px'
              pr='6px'
              borderRadius='full'
              bg='white'
              fontSize='11px'
              fontWeight='600'
              color={ink}
              cursor='pointer'
            >
              <span>Start Building</span>
              <Flex
                align='center'
                justify='center'
                w='26px'
                h='26px'
                borderRadius='full'
                bg={ink}
              >
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M2 6H10M6.5 2.5L10 6L6.5 9.5'
                    stroke='#fff'
                    strokeWidth='1.3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Flex>
            </chakra.button>
          </Flex>
        </Flex>
      </Flex>

      <Box
        flex='1 1 520px'
        minW='0'
        minH={{ base: '480px', md: '800px' }}
        position='relative'
        bg='#2c3a22'
      >
        <Image
          src='/images/v2/hills.jpg'
          alt='Green hills under a cloudy sky'
          position='absolute'
          inset='0'
          w='100%'
          h='100%'
          objectFit='cover'
          objectPosition='50% 50%'
        />
        <svg
          viewBox='0 0 15 15'
          preserveAspectRatio='none'
          fill='none'
          aria-hidden='true'
          style={{
            position: 'absolute',
            left: '50%',
            top: '54%',
            width: '30%',
            aspectRatio: '3/4',
            transform: 'translateX(-50%)',
            filter:
              'drop-shadow(0 0 10px rgba(255,246,190,0.55)) drop-shadow(0 0 28px rgba(255,246,190,0.3))',
            pointerEvents: 'none',
          }}
        >
          <path
            d={FLOWER_PATH}
            fill={cream}
          />
        </svg>
      </Box>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </Flex>
  );
}
