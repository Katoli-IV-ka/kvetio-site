import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { linkedinCopy } from '../../../shared/landing/site-content';
import {
  blue,
  cream,
  hairline,
  ink,
  inkCard,
  mutedSoft,
  pillBg,
  pillBorder,
  textSoft,
} from '../../../shared/theme/palette';
import { Grain } from '../../../shared/ui/Grain';

const RAY_ENDS = [
  [57, 38],
  [57, 45.9],
  [57, 57],
  [45.9, 57],
  [38, 57],
  [30.1, 57],
  [19, 57],
  [19, 45.9],
  [19, 38],
  [19, 30.1],
  [19, 19],
  [30.1, 19],
  [38, 19],
  [45.9, 19],
  [57, 19],
  [57, 30.1],
] as const;

function CompanyMark() {
  return (
    <svg
      width='76'
      height='76'
      viewBox='0 0 76 76'
      fill='none'
      aria-hidden='true'
    >
      <rect
        width='76'
        height='76'
        rx='16'
        fill='#131316'
      />
      <rect
        x='19'
        y='19'
        width='38'
        height='38'
        fill='#ffffff'
      />
      <g
        stroke={ink}
        strokeWidth='0.8'
      >
        {RAY_ENDS.map(([x, y]) => (
          <line
            key={`${x}-${y}`}
            x1='38'
            y1='38'
            x2={x}
            y2={y}
          />
        ))}
      </g>
      <circle
        cx='38'
        cy='38'
        r='6'
        fill='#f5b82e'
        stroke={ink}
        strokeWidth='1.5'
      />
    </svg>
  );
}

export function LinkedInCard() {
  return (
    <Flex
      as='section'
      id='linkedin'
      direction='column'
      align='center'
      gap={16}
      bg={ink}
      px={{ base: 5, md: 16 }}
      py={{ base: 14, md: 24 }}
    >
      <Heading
        as='h2'
        m='0'
        textAlign='center'
        fontSize={{ base: '30px', md: '40px' }}
        lineHeight='1.08'
        fontWeight='500'
        letterSpacing='-0.01em'
        textTransform='uppercase'
        color='white'
      >
        {linkedinCopy.title}
      </Heading>

      <Box
        as='article'
        w='100%'
        maxW='448px'
        borderRadius='28px'
        borderWidth='1px'
        borderColor={hairline}
        bg={inkCard}
        overflow='hidden'
      >
        <Box
          position='relative'
          h='122px'
          bg='#1c2027'
        >
          <Image
            src='/images/v2/li-banner.jpg'
            alt='Wildflower meadow'
            loading='lazy'
            position='absolute'
            inset='0'
            w='100%'
            h='100%'
            objectFit='cover'
          />
          <Grain opacity={0.55} />
          <Box
            position='absolute'
            inset='0'
            bg={`linear-gradient(180deg,rgba(19,20,24,0) 35%,${inkCard} 100%)`}
          />
          <Text
            position='absolute'
            left='0'
            right='0'
            top='50px'
            textAlign='center'
            fontSize='14px'
            color='white'
          >
            {linkedinCopy.banner} <span style={{ color: cream }}>{linkedinCopy.bannerAccent}</span>
          </Text>
        </Box>

        <Flex
          direction='column'
          gap={4}
          px={8}
          pb={7}
        >
          <Flex
            justify='space-between'
            align='flex-end'
            mt='-36px'
            position='relative'
          >
            <Box
              w='76px'
              h='76px'
              borderRadius='16px'
              overflow='hidden'
              boxShadow={`0 0 0 4px ${inkCard}`}
            >
              <CompanyMark />
            </Box>
            <Flex
              gap={2}
              pb='2px'
            >
              <Link
                href={linkedinCopy.url}
                target='_blank'
                rel='noopener noreferrer'
                display='inline-flex'
                alignItems='center'
                gap={2}
                h='34px'
                px={4}
                borderRadius='full'
                bg='white'
                fontSize='12px'
                fontWeight='600'
                color={ink}
                _hover={{ textDecoration: 'none', opacity: 0.9 }}
              >
                <svg
                  width='10'
                  height='10'
                  viewBox='0 0 10 10'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M5 1V9M1 5H9'
                    stroke={ink}
                    strokeWidth='1.6'
                    strokeLinecap='round'
                  />
                </svg>
                Follow
              </Link>
              <Link
                href={linkedinCopy.url}
                target='_blank'
                rel='noopener noreferrer'
                display='inline-flex'
                alignItems='center'
                gap={2}
                h='34px'
                px={4}
                borderRadius='full'
                bg={pillBg}
                borderWidth='1px'
                borderColor={pillBorder}
                fontSize='12px'
                fontWeight='500'
                color='white'
                _hover={{ textDecoration: 'none', borderColor: '#3a3d45' }}
              >
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M1.5 6L10.5 1.5L8 10.5L5.5 6.8L1.5 6Z'
                    stroke='#fff'
                    strokeWidth='1.1'
                    strokeLinejoin='round'
                  />
                </svg>
                Message
              </Link>
            </Flex>
          </Flex>

          <Flex
            direction='column'
            gap='10px'
          >
            <Flex
              align='center'
              gap={2}
            >
              <Heading
                as='h3'
                m='0'
                fontSize='26px'
                lineHeight='1.1'
                fontWeight='500'
                letterSpacing='-0.01em'
                color='white'
              >
                {linkedinCopy.name}
              </Heading>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                role='img'
                aria-label='Verified'
              >
                <circle
                  cx='8'
                  cy='8'
                  r='8'
                  fill={blue}
                />
                <path
                  d='M4.6 8.2L7 10.5L11.4 5.8'
                  stroke={ink}
                  strokeWidth='1.6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Flex>
            <Text
              m='0'
              fontSize='15px'
              lineHeight='1.45'
              color={textSoft}
            >
              {linkedinCopy.tagline}
            </Text>
            <Text
              m='0'
              fontSize='12px'
              lineHeight='1.5'
              color={mutedSoft}
            >
              {linkedinCopy.meta}
            </Text>
          </Flex>

          <Flex
            justify='space-between'
            align='center'
            pt={4}
            borderTopWidth='1px'
            borderColor={hairline}
            fontSize='12px'
            color={mutedSoft}
          >
            <Flex
              align='center'
              gap={2}
            >
              <Image
                src='/images/v2/li-avatar.jpg'
                alt={linkedinCopy.person}
                w='24px'
                h='24px'
                borderRadius='full'
                objectFit='cover'
              />
              <span>
                <Text
                  as='span'
                  color='white'
                  fontWeight='500'
                >
                  {linkedinCopy.person}
                </Text>{' '}
                works here
              </span>
            </Flex>
            <span>
              <Text
                as='span'
                color='white'
                fontWeight='600'
              >
                {linkedinCopy.followers}
              </Text>{' '}
              followers
            </span>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
