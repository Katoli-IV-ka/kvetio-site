import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { FLOWER_PATH } from '../../../shared/landing/geometry';
import { introCopy } from '../../../shared/landing/site-content';
import { cream, ink, muted, pillBg, pillBorder } from '../../../shared/theme/palette';
import { SiteNav } from '../../site-nav/ui/SiteNav';

export function Intro() {
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
      <Box
        position='absolute'
        top={{ base: 5, md: 8 }}
        left={{ base: 5, md: 'max(64px, calc((100vw - 1312px) / 2))' }}
        right={{ base: 5, md: 'auto' }}
        zIndex={3}
      >
        <SiteNav />
      </Box>
      <Flex
        direction='column'
        flex='1 1 520px'
        minW='0'
        pl={{ base: 5, md: 'max(64px, calc((100vw - 1312px) / 2))' }}
        pr={{ base: 5, md: 16 }}
        pt='120px'
        bg={{ base: 'transparent', md: ink }}
        position='relative'
        zIndex={1}
      >
        <Flex
          direction='column'
          justify='center'
          align={{ base: 'center', md: 'stretch' }}
          textAlign={{ base: 'center', md: 'left' }}
          flex='1 1 auto'
          gap={6}
          pt={{ base: 0, md: '80px' }}
          pb={{ base: 80, md: '96px' }}
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
            <Link
              href='/contact'
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
              _hover={{ textDecoration: 'none' }}
            >
              <span>Contact Us</span>
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
            </Link>
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
    </Flex>
  );
}
