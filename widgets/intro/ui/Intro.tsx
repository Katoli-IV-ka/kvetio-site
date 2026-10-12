import { useEffect, useState } from 'react';
import { Box, Flex, Image, Link, chakra } from '@chakra-ui/react';
import { FLOWER_PATH } from '../../../shared/landing/geometry';
import { introCopy, navLinks } from '../../../shared/landing/site-content';
import { cream } from '../../../shared/theme/palette';

const PAGE = '#050608';
const CARD = '#0a0c10';
const GLASS = 'rgba(255,255,255,0.22)';
const GLASS_EDGE = 'rgba(255,255,255,0.28)';
const FONT = "'Inter Tight', 'Inter', 'Helvetica Neue', Arial, sans-serif";

/** Film-grain tile: fractal noise as an inline SVG, laid over the photo. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1.2 -0.1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Grain({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <Box
      aria-hidden='true'
      position='absolute'
      inset='0'
      pointerEvents='none'
      opacity={opacity}
      css={{ backgroundImage: GRAIN, backgroundSize: '220px 220px', mixBlendMode: 'overlay' }}
    />
  );
}

const chips = navLinks.slice(0, 3);
const menuLinks = navLinks;

const glow =
  'drop-shadow(0 0 10px rgba(255,246,190,0.55)) drop-shadow(0 0 28px rgba(255,246,190,0.3))';

/** Splits the intro paragraph: the first sentence is bright, the rest dimmed. */
const [lead, ...restParts] = introCopy.description.replace(" —", "\u00a0—").split(/(?<=—)\s/);
const rest = restParts.join(' ');

function Flower({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      viewBox='0 0 15 15'
      preserveAspectRatio='none'
      fill='none'
      aria-hidden='true'
      style={{ position: 'absolute', aspectRatio: '3/4', pointerEvents: 'none', filter: glow, ...style }}
    >
      <path
        d={FLOWER_PATH}
        fill={cream}
      />
    </svg>
  );
}

/** Desktop: the whole first screen is one photo with the headline and a single button. */
function DesktopHero() {
  return (
    <Flex
      display={{ base: 'none', md: 'flex' }}
      position='relative'
      overflow='hidden'
      direction='column'
      align='center'
      justify='flex-start'
      textAlign='center'
      minH='100vh'
      px={10}
      pt='14vh'
      bg='#2c3a22'
      css={{ minHeight: '100dvh' }}
    >
      {/* Taller than the screen and pinned to the top: the runner ends up below the button. */}
      <Image
        src='/images/v1-hero-runner.webp'
        alt='A person in white running through a field between red bushes under heavy clouds'
        position='absolute'
        top='0'
        left='0'
        w='100%'
        h='125%'
        objectFit='cover'
        objectPosition='50% 0%'
      />
      <Box
        position='absolute'
        inset='0'
        bg='linear-gradient(180deg, rgba(14,15,19,0.62) 0%, rgba(14,15,19,0.42) 42%, rgba(14,15,19,0) 70%)'
      />
      <Grain />
      <chakra.h1
        position='relative'
        m='0'
        maxW='1100px'
        fontSize='clamp(48px, 6vw, 92px)'
        lineHeight='1.08'
        fontWeight='500'
        letterSpacing='-0.01em'
        textTransform='uppercase'
      >
        {introCopy.title}
      </chakra.h1>
      <Link
        href='/contact'
        position='relative'
        display='inline-flex'
        alignItems='center'
        gap='20px'
        h='56px'
        mt={10}
        pl='28px'
        pr='8px'
        borderRadius='full'
        borderWidth='1px'
        borderColor='rgba(255,255,255,0.55)'
        fontSize='15px'
        fontWeight='600'
        color='white'
        _hover={{ textDecoration: 'none', borderColor: 'white' }}
      >
        <span>Contact Us</span>
        <Flex
          align='center'
          justify='center'
          w='40px'
          h='40px'
          borderRadius='full'
          bg='white'
          color={PAGE}
        >
          <svg
            width='16'
            height='16'
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
      </Link>
    </Flex>
  );
}

/** Mobile: two rounded panels on a dark canvas: photo with the headline, and a dark text panel. */
export function Intro() {
  const [open, setOpen] = useState(false);

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

  return (
    <Box
      as='header'
      bg={PAGE}
      px={{ base: 3, md: 0 }}
      py={{ base: 3, md: 0 }}
      fontFamily={FONT}
      color='white'
    >
      <DesktopHero />
      <Box
        display={{ base: 'grid', md: 'none' }}
        gridTemplateColumns='1fr'
        gap={{ base: 3, md: 5 }}
        maxW='1120px'
        mx='auto'
      >
        {/* Left: photo panel */}
        <Box
          position='relative'
          overflow='hidden'
          borderRadius='20px'
          bg='#2c3a22'
          h={{ base: 'min(680px, 112vw)', md: 'clamp(560px, 84dvh, 760px)' }}
        >
          <Image
            src='/images/v1-hero-runner.webp'
            alt='A person in white running through a field between red bushes under heavy clouds'
            position='absolute'
            top='0'
            left='0'
            w='100%'
            h='125%'
            objectFit='cover'
            objectPosition='40% 0%'
          />
          <Box
            position='absolute'
            inset='0'
            bg='linear-gradient(180deg, rgba(8,12,6,0.55) 0%, rgba(8,12,6,0.35) 45%, rgba(8,12,6,0) 75%)'
          />
          <Grain />
          <Flex
            position='absolute'
            top='20px'
            left='20px'
            gap='4px'
            zIndex={2}
          >
            {chips.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                px='8px'
                py='4px'
                borderRadius='6px'
                bg={GLASS}
                fontSize='11px'
                fontWeight='500'
                lineHeight='1.2'
                color='white'
                css={{ backdropFilter: 'blur(12px)' }}
                _hover={{ textDecoration: 'none', bg: 'rgba(255,255,255,0.34)' }}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
          <chakra.h1
            position='absolute'
            left='50%'
            top='30%'
            m='0'
            w='78%'
            transform='translate(-50%, -50%)'
            textAlign='center'
            fontSize={{ base: '40px', md: 'clamp(34px, 3.6vw, 48px)' }}
            lineHeight='0.95'
            fontWeight='500'
            letterSpacing='-0.045em'
            textShadow='0 2px 30px rgba(0,0,0,0.25)'
          >
            {introCopy.title}
          </chakra.h1>
          <Link
            href='/contact'
            position='absolute'
            left='20px'
            bottom='20px'
            display='inline-flex'
            alignItems='center'
            gap='8px'
            h='40px'
            px='14px'
            borderRadius='10px'
            bg={GLASS}
            borderWidth='1px'
            borderColor={GLASS_EDGE}
            fontSize='12px'
            fontWeight='500'
            color='white'
            css={{ backdropFilter: 'blur(14px)' }}
            _hover={{ textDecoration: 'none', bg: 'rgba(255,255,255,0.34)' }}
          >
            Contact Us <span aria-hidden='true'>→</span>
          </Link>
        </Box>

        {/* Right: dark text panel */}
        <Box
          position='relative'
          overflow='hidden'
          borderRadius='20px'
          bg={CARD}
          h={{ base: 'min(680px, 112vw)', md: 'clamp(560px, 84dvh, 760px)' }}
        >
          <Flex
            position='relative'
            zIndex={2}
            justify='space-between'
            align='center'
            px='24px'
            pt='20px'
            fontSize='11px'
          >
            <Link
              href='/v1'
              color='white'
              _hover={{ textDecoration: 'none' }}
            >
              kvetio
            </Link>
            <chakra.button
              type='button'
              fontSize='11px'
              color='white'
              cursor='pointer'
              aria-expanded={open}
              aria-controls='v1-menu'
              onClick={() => setOpen(true)}
            >
              open menu
            </chakra.button>
          </Flex>
          <chakra.p
            position='relative'
            zIndex={2}
            m='0'
            px='24px'
            pt='36px'
            fontSize={{ base: '26px', md: 'clamp(24px, 2.5vw, 32px)' }}
            lineHeight='1.05'
            fontWeight='400'
            letterSpacing='-0.04em'
            color='#7d8088'
          >
            <chakra.span
              display='inline-block'
              w='26%'
              aria-hidden='true'
            />
            <chakra.span color='white'>{lead}</chakra.span> {rest}
          </chakra.p>
          <Box
            position='absolute'
            left='0'
            right='0'
            bottom='0'
            h='55%'
            overflow='hidden'
          >
            <Image
              src='/images/v2/hills.jpg'
              alt=''
              position='absolute'
              inset='0'
              w='100%'
              h='100%'
              objectFit='cover'
              objectPosition='50% 70%'
              opacity={0.55}
            />
            <Box
              position='absolute'
              inset='0'
              bg={`linear-gradient(180deg, ${CARD} 0%, rgba(10,12,16,0.2) 40%, rgba(10,12,16,0.55) 100%)`}
              css={{
                backgroundImage: `linear-gradient(180deg, ${CARD} 0%, rgba(10,12,16,0.2) 40%, rgba(10,12,16,0.55) 100%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: 'auto, 25% 25%, 25% 25%',
              }}
            />
            <Flower style={{ left: '50%', top: '18%', width: '30%', transform: 'translateX(-50%)' }} />
          </Box>
        </Box>
      </Box>

      {/* Fullscreen menu */}
      <Flex
        id='v1-menu'
        direction='column'
        position='fixed'
        inset='0'
        zIndex={70}
        px={6}
        pt={5}
        pb={12}
        bg={PAGE}
        overflowY='auto'
        opacity={open ? 1 : 0}
        visibility={open ? 'visible' : 'hidden'}
        transition='opacity 0.2s, visibility 0.2s'
        aria-hidden={!open}
      >
        <Flex
          justify='space-between'
          align='center'
          fontSize='11px'
        >
          <span>kvetio</span>
          <chakra.button
            type='button'
            fontSize='11px'
            color='white'
            cursor='pointer'
            onClick={() => setOpen(false)}
          >
            close
          </chakra.button>
        </Flex>
        <Flex
          direction='column'
          mt={10}
        >
          {menuLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              py='14px'
              fontSize='34px'
              lineHeight='1'
              fontWeight='500'
              letterSpacing='-0.045em'
              color='white'
              _hover={{ textDecoration: 'none', color: '#aab59a' }}
            >
              {item.label}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
