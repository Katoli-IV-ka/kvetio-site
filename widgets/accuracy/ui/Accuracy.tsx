import { useState } from 'react';
import { Box, Flex, Heading, Text, chakra } from '@chakra-ui/react';
import { axisPoint, roundedHexPath, smoothClosedPath } from '../../../shared/landing/radar';
import { accuracyCopy } from '../../../shared/landing/site-content';
import { blue, hairline, ink, inkSoft, muted, textSoft } from '../../../shared/theme/palette';

const CX = 300;
const CY = 300;
const R = 190;
const hexagon = (scale: number) => roundedHexPath(CX, CY, R * scale, 30 * scale);

const LABELS = [
  { x: 300, y: 74, anchor: 'middle' },
  { x: 494, y: 187, anchor: 'start' },
  { x: 494, y: 418, anchor: 'start' },
  { x: 300, y: 536, anchor: 'middle' },
  { x: 106, y: 418, anchor: 'end' },
  { x: 106, y: 187, anchor: 'end' },
] as const;

const OUTER = hexagon(1);
const RINGS = [0.75, 0.5, 0.25].map(hexagon);

export function Accuracy() {
  const [area, setArea] = useState(0);
  const [axis, setAxis] = useState(0);
  const { areas, axes, legend } = accuracyCopy;
  const values = areas[area]?.values ?? [];
  const points = values.map((value, i) => axisPoint(CX, CY, R * value, i));
  const shape = smoothClosedPath(points);

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
        gap={{ base: 10, md: 14 }}
        maxW='1312px'
        mx='auto'
      >
        <Flex
          wrap='wrap'
          justify='space-between'
          align='flex-end'
          gap='24px 64px'
        >
          <Heading
            as='h2'
            m='0'
            maxW='820px'
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
            maxW='380px'
            fontSize='15px'
            lineHeight='1.55'
            color={muted}
          >
            {accuracyCopy.description}
          </Text>
        </Flex>

        <Flex
          role='group'
          aria-label='Area of application'
          wrap='wrap'
          justify='center'
          gap={3}
        >
          {areas.map((item, index) => {
            const active = index === area;
            return (
              <chakra.button
                key={item.name}
                type='button'
                aria-pressed={active}
                onClick={() => setArea(index)}
                h='44px'
                px={6}
                borderRadius='full'
                borderWidth='1px'
                borderColor={active ? 'white' : '#2a2d35'}
                bg={active ? 'white' : 'transparent'}
                color={active ? ink : textSoft}
                fontSize='13px'
                fontWeight='500'
                cursor='pointer'
                transition='background .2s, color .2s, border-color .2s'
                _hover={{ borderColor: 'white' }}
              >
                {item.name}
              </chakra.button>
            );
          })}
        </Flex>

        <Box
          mx='auto'
          w='100%'
          maxW='820px'
        >
          <svg
            viewBox='-60 40 740 530'
            role='img'
            aria-label={`Radar chart of how much of a buyer's requirement ready-made data covers on six axes: ${axes.map((a) => a.name).join(', ')}. The cards below describe each axis.`}
            style={{ display: 'block', width: '100%', height: 'auto' }}
          >
            <path
              d={`${OUTER} ${shape}`}
              fillRule='evenodd'
              fill={blue}
              fillOpacity='0.3'
              stroke={blue}
              strokeWidth='2'
              strokeLinejoin='round'
            />
            {RINGS.map((d) => (
              <path
                key={d}
                d={d}
                fill='#ffffff'
                fillOpacity='0.03'
                stroke='#ffffff'
                strokeOpacity='0.14'
              />
            ))}
            <path
              d={shape}
              fill={ink}
              fillOpacity='0.85'
              stroke='#ffffff'
              strokeWidth='2.5'
              strokeLinejoin='round'
              style={{ transition: 'd .4s ease' }}
            />
            {points.map(({ x, y }, i) => (
              <circle
                key={axes[i]?.name}
                cx={x}
                cy={y}
                r={i === axis ? 10 : 5.5}
                fill={i === axis ? blue : ink}
                stroke={i === axis ? ink : '#ffffff'}
                strokeWidth='2.5'
              />
            ))}
            {axes.map((item, i) => {
              const label = LABELS[i];
              if (!label) return null;
              return (
                <text
                  key={item.name}
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 18,
                    fontWeight: 500,
                    fill: '#ffffff',
                  }}
                >
                  {item.name}
                </text>
              );
            })}
          </svg>
        </Box>

        <Flex
          wrap='wrap'
          justify='center'
          gap='16px 40px'
          fontSize='13px'
          fontWeight='500'
          color={textSoft}
        >
          {[
            { label: legend[0], bg: ink, opacity: 1 },
            { label: legend[1], bg: blue, opacity: 0.6 },
          ].map((item) => (
            <Flex
              key={item.label}
              align='center'
              gap={3}
            >
              <Box
                as='span'
                display='inline-block'
                w='28px'
                h='18px'
                borderRadius='3px'
                borderWidth='2px'
                borderColor='white'
                bg={item.bg}
                opacity={item.opacity}
              />
              <span>{item.label}</span>
            </Flex>
          ))}
        </Flex>

        <Box
          as='ul'
          m='0'
          p='0'
          listStyleType='none'
          display='grid'
          gridTemplateColumns='repeat(auto-fit, minmax(min(300px, 100%), 1fr))'
          gap={3}
        >
          {axes.map((item, index) => {
            const active = index === axis;
            return (
              <Box
                as='li'
                key={item.name}
                display='flex'
              >
                <chakra.button
                  type='button'
                  onClick={() => setAxis(index)}
                  onMouseEnter={() => setAxis(index)}
                  onFocus={() => setAxis(index)}
                  flex='1 1 auto'
                  textAlign='left'
                  display='grid'
                  gridTemplateColumns='32px minmax(0, 1fr)'
                  gap='4px 12px'
                  alignItems='start'
                  p={5}
                  borderRadius='20px'
                  borderWidth='1px'
                  borderColor={active ? 'white' : hairline}
                  bg={active ? inkSoft : 'transparent'}
                  color='white'
                  cursor='pointer'
                  transition='border-color .2s, background .2s'
                >
                  <Text
                    as='span'
                    pt='3px'
                    fontSize='13px'
                    fontWeight='500'
                    color={muted}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                  <Flex
                    as='span'
                    direction='column'
                    gap='6px'
                  >
                    <Text
                      as='span'
                      fontSize='17px'
                      fontWeight='600'
                      letterSpacing='-0.01em'
                    >
                      {item.name}
                    </Text>
                    <Text
                      as='span'
                      fontSize='14px'
                      lineHeight='1.5'
                      color={muted}
                    >
                      {item.text}
                    </Text>
                  </Flex>
                </chakra.button>
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}
