'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, HStack, Link, VStack } from '@chakra-ui/react';
import { ContactModal } from 'features/contact/ui/ContactModal';
import { glassBorder, mutedText } from '../../../shared/theme/colors';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Data Types', href: '#data-types' },
  { label: 'Samples', href: '#samples' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Quality', href: '#quality' },
];

function NavPill() {
  return (
    <HStack
      as='nav'
      gap={1}
      px={2}
      py={2}
      borderWidth='1px'
      borderColor={glassBorder}
      borderRadius='full'
      bg='whiteAlpha.50'
      backdropFilter='blur(18px)'
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          px={4}
          py={2}
          borderRadius='full'
          color={mutedText}
          fontSize='sm'
          _hover={{ color: 'white', textDecoration: 'none', bg: 'whiteAlpha.100' }}
        >
          {item.label}
        </Link>
      ))}
    </HStack>
  );
}

function BurgerButton({ onClick }: { onClick: () => void }) {
  return (
    <Box
      as='button'
      onClick={onClick}
      display='flex'
      alignItems='center'
      justifyContent='center'
      w='44px'
      h='44px'
      borderRadius='full'
      borderWidth='1px'
      borderColor={glassBorder}
      bg='whiteAlpha.50'
      backdropFilter='blur(18px)'
      color='white'
      cursor='pointer'
      flexShrink={0}
      transition='background 0.2s ease'
      _hover={{ bg: 'whiteAlpha.100' }}
    >
      <svg
        width='18'
        height='12'
        viewBox='0 0 18 12'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      >
        <line
          x1='0'
          y1='1'
          x2='18'
          y2='1'
        />
        <line
          x1='0'
          y1='6'
          x2='18'
          y2='6'
        />
        <line
          x1='0'
          y1='11'
          x2='18'
          y2='11'
        />
      </svg>
    </Box>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <Box
        position='fixed'
        inset='0'
        zIndex={200}
        bg='blackAlpha.700'
        backdropFilter='blur(4px)'
        opacity={open ? 1 : 0}
        pointerEvents={open ? 'auto' : 'none'}
        transition='opacity 0.3s ease'
        onClick={onClose}
      />

      <Box
        position='fixed'
        top='0'
        left='0'
        bottom='0'
        w='72'
        zIndex={201}
        bg='rgba(5,2,13,0.96)'
        backdropFilter='blur(24px)'
        borderRightWidth='1px'
        borderRightColor={glassBorder}
        transition='transform 0.35s cubic-bezier(0.22,1,0.36,1)'
        style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
        p={6}
        display='flex'
        flexDirection='column'
      >
        <Box
          as='button'
          onClick={onClose}
          position='absolute'
          top={4}
          right={4}
          w='36px'
          h='36px'
          borderRadius='full'
          borderWidth='1px'
          borderColor={glassBorder}
          bg='whiteAlpha.50'
          color='white'
          cursor='pointer'
          display='flex'
          alignItems='center'
          justifyContent='center'
          transition='background 0.2s ease'
          _hover={{ bg: 'whiteAlpha.100' }}
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          >
            <line
              x1='1'
              y1='1'
              x2='13'
              y2='13'
            />
            <line
              x1='13'
              y1='1'
              x2='1'
              y2='13'
            />
          </svg>
        </Box>

        <Box
          position='relative'
          w='120px'
          h='68px'
          mb={10}
          flexShrink={0}
        >
          <Image
            src='/design/logo-white.png'
            alt='Kvetio'
            fill
            sizes='120px'
            style={{ objectFit: 'contain' }}
          />
        </Box>

        <VStack
          align='stretch'
          gap={1}
          flex={1}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              px={4}
              py={3}
              borderRadius='xl'
              color={mutedText}
              fontSize='md'
              fontWeight='500'
              _hover={{ color: 'white', textDecoration: 'none', bg: 'whiteAlpha.100' }}
            >
              {item.label}
            </Link>
          ))}
        </VStack>

        <Box mt={6}>
          <ContactModal
            triggerLabel='Contact us'
            fullWidth
          />
        </Box>
      </Box>
    </>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Box
        as='header'
        py={{ base: 3, md: 4 }}
      >
        <Box
          position='relative'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          px={{ base: 0, md: 1 }}
          w='full'
          minW={0}
        >
          {/* Mobile: burger left */}
          <Box display={{ base: 'flex', lg: 'none' }}>
            <BurgerButton onClick={() => setDrawerOpen(true)} />
          </Box>

          {/* Logo: centered on mobile (absolute), left on desktop */}
          <Box
            position={{ base: 'absolute', lg: 'relative' }}
            left={{ base: '50%', lg: 'auto' }}
            style={{ transform: 'translateX(-50%)' }}
            w={{ base: '96px', md: '156px' }}
            h={{ base: '56px', md: '88px' }}
            flexShrink={0}
            display={{ base: 'block', lg: 'none' }}
          >
            <Image
              src='/design/logo-white.png'
              alt='Kvetio'
              fill
              sizes='224px'
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>

          {/* Desktop: logo left (in flow) */}
          <Box
            position='relative'
            w='156px'
            h='88px'
            flexShrink={0}
            display={{ base: 'none', lg: 'block' }}
          >
            <Image
              src='/design/logo-white.png'
              alt='Kvetio'
              fill
              sizes='224px'
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>

          {/* Desktop: nav pill centered */}
          <Box
            display={{ base: 'none', lg: 'flex' }}
            position='absolute'
            left='50%'
            style={{ transform: 'translateX(-50%)' }}
          >
            <NavPill />
          </Box>

          {/* Desktop: contact button right */}
          <Box
            display={{ base: 'none', lg: 'block' }}
            flexShrink={0}
          >
            <ContactModal
              triggerLabel='Contact'
              triggerSize='md'
            />
          </Box>

          {/* Mobile: spacer to balance burger on left */}
          <Box
            display={{ base: 'flex', lg: 'none' }}
            w='44px'
            flexShrink={0}
          />
        </Box>
      </Box>

      {/* Desktop: floating nav pill */}
      <Box
        display={{ base: 'none', lg: 'block' }}
        position='fixed'
        top={5}
        left='50%'
        zIndex={99}
        opacity={scrolled ? 1 : 0}
        pointerEvents={scrolled ? 'auto' : 'none'}
        transition='opacity 0.3s ease'
        style={{ transform: 'translateX(-50%)' }}
      >
        <NavPill />
      </Box>

      {/* Mobile: floating burger */}
      <Box
        display={{ base: 'flex', lg: 'none' }}
        position='fixed'
        top={4}
        right={4}
        zIndex={99}
        opacity={scrolled ? 1 : 0}
        pointerEvents={scrolled ? 'auto' : 'none'}
        transition='opacity 0.3s ease'
      >
        <BurgerButton onClick={() => setDrawerOpen(true)} />
      </Box>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
