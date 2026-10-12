import { useEffect, useState } from 'react';
import { Box, Flex, Link, chakra } from '@chakra-ui/react';
import { navLinks } from '../../../shared/landing/site-content';
import { ink } from '../../../shared/theme/palette';
import { Flower } from '../../../shared/ui/Flower';

const BAR_H = '64px';
const SOFT = 'rgba(255,255,255,0.82)';

const cta = navLinks[navLinks.length - 1];
const links = navLinks.slice(0, -1);

/**
 * Header in the same language as /v2: a flat bar without borders that sits on the page
 * background, brand on the left, plain text links, a pill call-to-action, and on small
 * screens a burger that opens a fullscreen menu.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const solid = scrolled || open;

  return (
    <Box
      as='header'
      position='fixed'
      top='0'
      left='0'
      right='0'
      zIndex={60}
      h={BAR_H}
    >
      <Flex
        as='nav'
        aria-label='Primary'
        position='relative'
        zIndex={2}
        h={BAR_H}
        align='center'
        justify='space-between'
        gap={8}
        px={{ base: 6, lg: 14 }}
        bg={solid ? ink : 'transparent'}
        transition='background 0.2s'
      >
        <Link
          href='/v1'
          aria-label='Kvetio home'
          display='flex'
          alignItems='center'
          gap={4}
          color='white'
          fontSize='13px'
          _hover={{ textDecoration: 'none' }}
          onClick={close}
        >
          <Flower size={32} />
          <span>Kvetio</span>
        </Link>

        <Flex
          display={{ base: 'none', lg: 'flex' }}
          align='center'
          gap={7}
          ml='auto'
        >
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              fontSize='14px'
              color={SOFT}
              textShadow='0 0 12px rgba(0,0,0,0.45)'
              whiteSpace='nowrap'
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
            h='40px'
            px={6}
            borderRadius='20px'
            bg='white'
            color={ink}
            fontSize='14px'
            fontWeight='500'
            whiteSpace='nowrap'
            _hover={{ textDecoration: 'none', bg: '#e6e6e6' }}
          >
            {cta.label}
          </Link>
        ) : null}

        <chakra.button
          type='button'
          display={{ base: 'flex', lg: 'none' }}
          alignItems='center'
          justifyContent='center'
          w='44px'
          h='44px'
          mr='-10px'
          color='white'
          cursor='pointer'
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls='v1-mobile-menu'
          onClick={() => setOpen((value) => !value)}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            aria-hidden='true'
          >
            <path
              d={open ? 'M5 5L19 19M19 5L5 19' : 'M2 6H22M2 12H22M2 18H22'}
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='square'
            />
          </svg>
        </chakra.button>
      </Flex>

      <Flex
        id='v1-mobile-menu'
        display={{ base: 'flex', lg: 'none' }}
        direction='column'
        position='fixed'
        inset='0'
        zIndex={1}
        pt={`calc(${BAR_H} + 32px)`}
        px={6}
        pb={12}
        overflowY='auto'
        bg={ink}
        opacity={open ? 1 : 0}
        visibility={open ? 'visible' : 'hidden'}
        transition='opacity 0.2s, visibility 0.2s'
        aria-hidden={!open}
      >
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={close}
            py='18px'
            fontSize='22px'
            lineHeight='28px'
            letterSpacing='-0.02em'
            color='white'
            _hover={{ textDecoration: 'none' }}
          >
            {item.label}
          </Link>
        ))}
        {cta ? (
          <Link
            href={cta.href}
            onClick={close}
            alignSelf='flex-start'
            display='inline-flex'
            alignItems='center'
            h='48px'
            mt={7}
            px={7}
            borderRadius='24px'
            bg='white'
            color={ink}
            fontSize='15px'
            fontWeight='500'
            _hover={{ textDecoration: 'none', bg: '#e6e6e6' }}
          >
            {cta.label}
          </Link>
        ) : null}
      </Flex>
    </Box>
  );
}
