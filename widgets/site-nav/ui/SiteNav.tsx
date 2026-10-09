import { useState } from 'react';
import { Box, Flex, Link, chakra } from '@chakra-ui/react';
import { navLinks } from '../../../shared/landing/site-content';
import { cream, ink } from '../../../shared/theme/palette';
import { Flower } from '../../../shared/ui/Flower';

/** Shades taken from the hero photo: dark olive hills, grey-green haze, the cream flower. */
const BAR = 'rgba(30,38,24,0.84)';
const EDGE = 'rgba(246,241,200,0.2)';
const SOFT = '#aab59a';
const BAR_H = '48px';

/** Main sections, then quieter ones, then the call to action (the last navLinks entry). */
const PRIMARY_COUNT = 4;
const primary = navLinks.slice(0, PRIMARY_COUNT);
const secondary = navLinks.slice(PRIMARY_COUNT, -1);
const cta = navLinks[navLinks.length - 1];

const linkProps = {
  display: 'inline-flex',
  alignItems: 'center',
  h: BAR_H,
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.02em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
} as const;

/** Floating dark bar: logo, main links | quieter links | white call-to-action block. */
export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box
      as='nav'
      aria-label='Primary'
      position='relative'
      display='inline-block'
      maxW='100%'
      w={{ base: '100%', lg: 'auto' }}
      css={{ backdropFilter: 'blur(10px)' }}
    >
      <Flex
        align='stretch'
        h={BAR_H}
        bg={BAR}
        borderWidth='1px'
        borderColor={EDGE}
        overflow='hidden'
      >
        <Link
          href='/'
          aria-label='Kvetio home'
          display='flex'
          alignItems='center'
          gap={2.5}
          px={5}
          color='white'
          fontSize='12px'
          fontWeight='600'
          letterSpacing='0.04em'
          textTransform='uppercase'
          _hover={{ textDecoration: 'none' }}
        >
          <Flower size={20} />
          <span>Kvetio</span>
        </Link>

        <Flex
          display={{ base: 'none', lg: 'flex' }}
          align='stretch'
          gap={7}
          px={7}
        >
          {primary.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              {...linkProps}
              color='white'
              _hover={{ textDecoration: 'none', color: cream }}
            >
              {item.label}
            </Link>
          ))}
        </Flex>
        <Flex
          display={{ base: 'none', lg: 'flex' }}
          align='stretch'
          gap={7}
          px={7}
        >
          {secondary.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              {...linkProps}
              color={SOFT}
              _hover={{ textDecoration: 'none', color: 'white' }}
            >
              {item.label}
            </Link>
          ))}
        </Flex>
        {cta ? (
          <Link
            href={cta.href}
            display={{ base: 'none', lg: 'inline-flex' }}
            alignItems='center'
            px={8}
            bg={cream}
            color={ink}
            fontSize='11px'
            fontWeight='700'
            letterSpacing='0.02em'
            textTransform='uppercase'
            whiteSpace='nowrap'
            _hover={{ textDecoration: 'none', bg: '#fffbe0' }}
          >
            {cta.label}
          </Link>
        ) : null}

        <chakra.button
          type='button'
          display={{ base: 'inline-flex', lg: 'none' }}
          alignItems='center'
          justifyContent='center'
          ml='auto'
          w={BAR_H}
          color='white'
          cursor='pointer'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <svg
            width='20'
            height='20'
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
      </Flex>

      <Flex
        display={{ base: menuOpen ? 'flex' : 'none', lg: 'none' }}
        direction='column'
        position='absolute'
        top='100%'
        left='0'
        right='0'
        mt='-1px'
        bg='#1e2618'
        borderWidth='1px'
        borderColor={EDGE}
        zIndex={5}
      >
        {navLinks.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            px={5}
            py={3.5}
            fontSize='12px'
            fontWeight='600'
            letterSpacing='0.02em'
            textTransform='uppercase'
            color={index === navLinks.length - 1 ? ink : index < PRIMARY_COUNT ? 'white' : SOFT}
            bg={index === navLinks.length - 1 ? cream : 'transparent'}
            _hover={{ textDecoration: 'none' }}
          >
            {item.label}
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
