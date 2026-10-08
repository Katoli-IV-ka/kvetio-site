import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { accuracyCopy } from '../../../shared/landing/site-content';
import {
  amberDark,
  blue,
  hairline,
  ink,
  muted,
  mutedSoft,
  textSoft,
} from '../../../shared/theme/palette';

export function Accuracy() {
  const [blueLabel, amberLabel] = accuracyCopy.legend;
  return (
    <Box
      as='section'
      id='accuracy'
      bg={ink}
      px={{ base: 5, md: 16 }}
      py={{ base: 14, md: 24 }}
    >
      <Flex
        direction='column'
        gap={14}
        maxW='1312px'
        mx='auto'
      >
        <Flex
          direction='column'
          gap={5}
          maxW='640px'
        >
          <Heading
            as='h2'
            m='0'
            fontSize={{ base: '30px', md: '40px' }}
            lineHeight='1.08'
            fontWeight='500'
            letterSpacing='-0.01em'
            textTransform='uppercase'
            color='white'
          >
            {accuracyCopy.title}
          </Heading>
          <Text
            m='0'
            fontSize='15px'
            lineHeight='1.55'
            color={muted}
          >
            {accuracyCopy.description}
          </Text>
        </Flex>

        <Flex
          direction='column'
          gap={4}
        >
          <svg
            viewBox='0 0 1312 400'
            role='img'
            aria-label='Illustrative chart: availability of ready-made data falls from early stages to production, while in-house simulation complexity rises'
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
          >
            <line
              x1='0'
              y1='372'
              x2='1312'
              y2='372'
              stroke={hairline}
              strokeWidth='1'
              vectorEffect='non-scaling-stroke'
            />
            <path
              d='M12 70 C 150 240 280 322 500 346 C 640 355 860 358 1296 360'
              fill='none'
              stroke={blue}
              strokeWidth='2'
              strokeLinecap='round'
              vectorEffect='non-scaling-stroke'
            />
            <path
              d='M12 312 C 300 314 540 300 760 262 C 960 226 1130 130 1296 42'
              fill='none'
              stroke={amberDark}
              strokeWidth='2'
              strokeLinecap='round'
              vectorEffect='non-scaling-stroke'
            />
            <circle
              cx='1296'
              cy='360'
              r='5'
              fill={blue}
              stroke={ink}
              strokeWidth='2'
            />
            <circle
              cx='1296'
              cy='42'
              r='5'
              fill={amberDark}
              stroke={ink}
              strokeWidth='2'
            />
          </svg>
          <Flex
            justify='space-between'
            gap={4}
            fontSize='11px'
            fontWeight='500'
            letterSpacing='0.12em'
            textTransform='uppercase'
            color={mutedSoft}
          >
            {accuracyCopy.stages.map((stage) => (
              <span key={stage}>{stage}</span>
            ))}
          </Flex>
        </Flex>

        <Flex
          wrap='wrap'
          gap={{ base: '12px 24px', md: '12px 40px' }}
          fontSize='13px'
          color={textSoft}
        >
          {[
            { label: blueLabel, color: blue },
            { label: amberLabel, color: amberDark },
          ].map((item) => (
            <Flex
              key={item.label}
              align='center'
              gap={3}
            >
              <Box
                as='span'
                display='inline-block'
                w='24px'
                h='2px'
                borderRadius='2px'
                bg={item.color}
              />
              <span>{item.label}</span>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
