import { useRef } from 'react';
import { Box, chakra, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useCaseCards } from '../../../shared/landing/site-content';
import { ink } from '../../../shared/theme/palette';
import { Flower } from '../../../shared/ui/Flower';
import { Grain } from '../../../shared/ui/Grain';

const TOTAL = String(useCaseCards.length).padStart(2, '0');

function Arrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <chakra.button
      type='button'
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous cards' : 'Next cards'}
      display='inline-flex'
      alignItems='center'
      justifyContent='center'
      w='44px'
      h='44px'
      borderRadius='full'
      bg='#1a1c22'
      borderWidth='1px'
      borderColor='#2a2d35'
      color='white'
      cursor='pointer'
      _hover={{ borderColor: '#3a3d45' }}
    >
      <svg
        width='14'
        height='14'
        viewBox='0 0 12 12'
        fill='none'
        aria-hidden='true'
        style={{ transform: direction === 'prev' ? 'rotate(180deg)' : undefined }}
      >
        <path
          d='M2 6H10M6.5 2.5L10 6L6.5 9.5'
          stroke='currentColor'
          strokeWidth='1.3'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </chakra.button>
  );
}

export function Cases() {
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollRow = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Box
      as='section'
      id='cases'
      bg={ink}
      px={{ base: 5, md: 16 }}
      py={{ base: 14, md: 24 }}
    >
      <Flex
        direction='column'
        gap={12}
        maxW='1312px'
        mx='auto'
      >
        <Flex
          align='flex-end'
          justify='space-between'
          gap={6}
        >
          <Heading
            as='h2'
            m='0'
            maxW='560px'
            fontSize={{ base: '30px', md: '40px' }}
            lineHeight='1.08'
            fontWeight='500'
            letterSpacing='-0.01em'
            textTransform='uppercase'
            color='white'
          >
            Built for your edge case
          </Heading>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            gap={2}
            flexShrink={0}
          >
            <Arrow
              direction='prev'
              onClick={() => scrollRow(-1)}
            />
            <Arrow
              direction='next'
              onClick={() => scrollRow(1)}
            />
          </Flex>
        </Flex>

        <Flex
          ref={rowRef}
          gap={5}
          overflowX='auto'
          pb={5}
          css={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'thin',
            scrollbarColor: '#3a3d45 transparent',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {useCaseCards.map((card, index) => {
            const number = String(index + 1).padStart(2, '0');
            const headerColor = card.headerTone === 'dark' ? ink : 'white';
            return (
              <Box
                as='article'
                key={card.title}
                flex={{
                  base: '0 0 78%',
                  sm: '0 0 calc((100% - 20px) / 2.3)',
                  xl: '0 0 calc((100% - 60px) / 4)',
                }}
                minW='240px'
                aspectRatio='10 / 19'
                position='relative'
                borderRadius='28px'
                overflow='hidden'
                bg={ink}
                color='white'
                css={{ scrollSnapAlign: 'start' }}
              >
                <Image
                  src={`/images/v2/${card.image}.jpg`}
                  alt={card.alt}
                  loading='lazy'
                  position='absolute'
                  inset='0'
                  w='100%'
                  h='100%'
                  objectFit='cover'
                  objectPosition={card.position}
                />
                <Grain opacity={0.55} />
                <Box
                  position='absolute'
                  inset='0'
                  bg={
                    card.topScrim
                      ? 'linear-gradient(180deg,rgba(0,0,0,0.35) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.8) 100%)'
                      : 'linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.8) 100%)'
                  }
                />
                <Flex
                  position='absolute'
                  top={6}
                  left={6}
                  right={6}
                  align='center'
                  gap='10px'
                  py={3}
                  fontSize='14px'
                  fontWeight='500'
                  color={headerColor}
                >
                  <Flower size={16} />
                  <span>Kvetio</span>
                  <Text
                    as='span'
                    ml='auto'
                    fontSize='11px'
                    fontWeight='400'
                    letterSpacing='0.06em'
                    opacity={0.75}
                  >
                    {number} / {TOTAL}
                  </Text>
                </Flex>
                <Flex
                  direction='column'
                  gap='10px'
                  position='absolute'
                  left={6}
                  right={6}
                  bottom={6}
                >
                  <Heading
                    as='h3'
                    m='0'
                    fontSize='26px'
                    lineHeight='1.1'
                    fontWeight='400'
                    letterSpacing='-0.01em'
                    color='white'
                  >
                    {card.title}
                  </Heading>
                  <Text
                    m='0'
                    fontSize='14px'
                    lineHeight='1.4'
                    color='rgba(255,255,255,0.88)'
                  >
                    {card.description}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
}
