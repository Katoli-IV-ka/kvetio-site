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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Flex
      as='header'
      wrap='wrap'
      align='stretch'
      bg={ink}
      position='relative'
      overflow='hidden'
      minH='100vh'
      css={{ minHeight: '100dvh' }}
    >
      <Flex
        direction='column'
        flex='1 1 520px'
        minW='0'
        pl={{ base: 5, md: 'max(64px, calc((100vw - 1312px) / 2))' }}
        pr={{ base: 5, md: 16 }}
        pt={10}
        bg={{ base: 'transparent', md: ink }}
        position='relative'
        zIndex={1}
      >
        <Flex
          as='nav'
          aria-label='Primary'
          wrap='wrap'
          align='center'
          justify={{ base: 'space-between', md: 'flex-start' }}
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
              {menuOpen ? (
                <path
                  d='M5 5L17 17M17 5L5 17'
                  stroke='currentColor'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                />
              ) : (
                <path
                  d='M3 6H19M3 11H19M3 16H19'
                  stroke='currentColor'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                />
              )}
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
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
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
          align={{ base: 'center', md: 'stretch' }}
          textAlign={{ base: 'center', md: 'left' }}
          flex='1 1 auto'
          gap={6}
          pt={{ base: 0, md: '80px' }}
          pb={{ base: 56, md: '96px' }}
          maxW={{ base: 'none', md: '420px' }}
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
            display={{ base: 'none', md: 'block' }}
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
            justify={{ base: 'center', md: 'flex-start' }}
          >
            <Link
              href='#cases'
              display={{ base: 'none', md: 'inline-flex' }}
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
              bg={{ base: 'transparent', md: 'white' }}
              borderWidth={{ base: '1px', md: '0' }}
              borderColor='rgba(255,255,255,0.55)'
              fontSize='11px'
              fontWeight='600'
              color={{ base: 'white', md: ink }}
              cursor='pointer'
            >
              <span>Start Building</span>
              <Flex
                align='center'
                justify='center'
                w='26px'
                h='26px'
                borderRadius='full'
                bg={{ base: 'white', md: ink }}
                color={{ base: ink, md: 'white' }}
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
                    stroke='currentColor'
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
        position={{ base: 'absolute', md: 'relative' }}
        inset={{ base: '0', md: 'auto' }}
        minH={{ base: '100%', md: '100%' }}
        zIndex={0}
        bg='#2c3a22'
        css={{
          '--flower-top': 'auto',
          '--flower-bottom': '15%',
          '--flower-w': '40%',
          '@media (min-width: 48em)': {
            '--flower-top': '54%',
            '--flower-bottom': 'auto',
            '--flower-w': '30%',
          },
        }}
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
        <Box
          display={{ base: 'block', md: 'none' }}
          position='absolute'
          inset='0'
          bg='linear-gradient(180deg, rgba(14,15,19,0.88) 0%, rgba(14,15,19,0.55) 45%, rgba(14,15,19,0.1) 100%)'
        />
        <svg
          viewBox='0 0 15 15'
          preserveAspectRatio='none'
          fill='none'
          aria-hidden='true'
          style={{
            position: 'absolute',
            left: '50%',
            top: 'var(--flower-top)',
            bottom: 'var(--flower-bottom)',
            width: 'var(--flower-w)',
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
