import { useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { axisPoint, roundedHexPath, smoothClosedPath } from '../../../shared/landing/radar';
import { accuracyCopy } from '../../../shared/landing/site-content';
import { blue, ink, muted, mutedSoft, textSoft } from '../../../shared/theme/palette';

const LINE = '#2a2d35';
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const CX = 300;
const CY = 300;
const R = 190;

const hexagon = (scale: number) => roundedHexPath(CX, CY, R * scale, 30 * scale);

/** Where each axis name sits around the chart (viewBox units). */
const LABELS = [
  { x: 300, y: 82, anchor: 'middle' },
  { x: 488, y: 193, anchor: 'start' },
  { x: 488, y: 418, anchor: 'start' },
  { x: 300, y: 528, anchor: 'middle' },
  { x: 112, y: 418, anchor: 'end' },
  { x: 112, y: 193, anchor: 'end' },
] as const;

const RINGS = [1, 0.66, 0.33].map(hexagon);

function AxisRow({
  index,
  name,
  text,
  active,
  onActivate,
}: {
  index: number;
  name: string;
  text: string;
  active: boolean;
  onActivate?: () => void;
}) {
  return (
    <Box
      as='li'
      display='grid'
      gridTemplateColumns='36px 1fr'
      columnGap={3}
      py={4}
      borderTopWidth='1px'
      borderColor={LINE}
      tabIndex={onActivate ? 0 : undefined}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <Text
        m='0'
        pt='2px'
        fontFamily={MONO}
        fontSize='12px'
        color={active ? blue : muted}
        transition='color .2s'
      >
        {String(index + 1).padStart(2, '0')}
      </Text>
      <Box>
        <Text
          m='0'
          fontSize='14px'
          fontWeight='600'
          letterSpacing='0.02em'
          textTransform='uppercase'
          color={active ? 'white' : textSoft}
          transition='color .2s'
        >
          {name}
        </Text>
        <Text
          m='0'
          mt={1}
          fontSize='14px'
          lineHeight='1.5'
          color={muted}
        >
          {text}
        </Text>
      </Box>
    </Box>
  );
}

/** Heading and axis list on the left, the radar on the right. */
export function Accuracy() {
  const [axis, setAxis] = useState(0);
  const { areas, axes, legend } = accuracyCopy;
  const values = areas[0]?.values ?? [];
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
      <Box
        display='grid'
        gridTemplateColumns={{ base: '1fr', lg: 'minmax(300px, 0.9fr) 1.1fr' }}
        columnGap={16}
        rowGap={10}
        alignItems='center'
        maxW='1312px'
        mx='auto'
      >
        <Flex
          direction='column'
          gap={10}
        >
          <Flex
            direction='column'
            gap={5}
          >
            <Heading
              as='h2'
              m='0'
              fontSize={{ base: '26px', md: '32px' }}
              lineHeight='1.12'
              fontWeight='500'
              letterSpacing='-0.01em'
              textTransform='uppercase'
              color='white'
            >
              {accuracyCopy.title}
            </Heading>
            <Text
              m='0'
              maxW='480px'
              fontSize='15px'
              lineHeight='1.55'
              color={muted}
            >
              {accuracyCopy.description}
            </Text>
          </Flex>

          <Box
            as='ol'
            m='0'
            p='0'
            listStyleType='none'
            display={{ base: 'none', lg: 'block' }}
          >
            {axes.map((item, index) => (
              <AxisRow
                key={item.name}
                index={index}
                name={item.name}
                text={item.text}
                active={index === axis}
                onActivate={() => setAxis(index)}
              />
            ))}
          </Box>
        </Flex>

        <Flex
          direction='column'
          gap={6}
          minW='0'
        >
          <Box
            css={{
              '& .lbl-num': { display: 'block' },
              '& .lbl-name': { display: 'none' },
              '@media (min-width: 62em)': {
                '& .lbl-num': { display: 'none' },
                '& .lbl-name': { display: 'block' },
              },
            }}
          >
            <svg
              viewBox='-120 40 840 530'
              role='img'
              aria-label={`Radar chart of how much of a buyer's requirement ready-made data covers on six axes: ${axes.map((a) => a.name).join(', ')}.`}
              style={{ display: 'block', width: '100%', height: 'auto' }}
            >
              <path
                d={`${hexagon(1)} ${shape}`}
                fillRule='evenodd'
                fill={blue}
                fillOpacity='0.2'
                stroke={blue}
                strokeWidth='1.5'
                strokeLinejoin='round'
              />
              {RINGS.map((d) => (
                <path
                  key={d}
                  d={d}
                  fill='none'
                  stroke={LINE}
                />
              ))}
              <path
                d={shape}
                fill={ink}
                stroke='#ffffff'
                strokeWidth='1.5'
                strokeLinejoin='round'
              />
              {points.map(({ x, y }, i) => (
                <circle
                  key={axes[i]?.name}
                  cx={x}
                  cy={y}
                  r={i === axis ? 7 : 4}
                  fill={i === axis ? blue : '#ffffff'}
                  stroke={ink}
                  strokeWidth='2'
                />
              ))}
              {axes.map((item, i) => {
                const label = LABELS[i];
                if (!label) return null;
                return (
                  <g
                    key={item.name}
                    style={{ fill: i === axis ? '#ffffff' : mutedSoft, transition: 'fill .2s' }}
                  >
                    <text
                      className='lbl-name'
                      x={label.x}
                      y={label.y}
                      textAnchor={label.anchor}
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.name}
                    </text>
                    <text
                      className='lbl-num'
                      x={label.x}
                      y={label.y}
                      textAnchor={label.anchor}
                      style={{ fontFamily: MONO, fontSize: 24 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </text>
                  </g>
                );
              })}
            </svg>
          </Box>

          <Flex
            wrap='wrap'
            justify='center'
            gap='12px 32px'
            fontSize='13px'
            color={textSoft}
          >
            {[
              { label: legend[0], fill: ink, border: '#ffffff' },
              { label: legend[1], fill: 'rgba(79,149,201,0.25)', border: blue },
            ].map((item) => (
              <Flex
                key={item.label}
                align='center'
                gap={3}
              >
                <Box
                  as='span'
                  display='inline-block'
                  w='14px'
                  h='14px'
                  borderRadius='3px'
                  borderWidth='1.5px'
                  borderColor={item.border}
                  bg={item.fill}
                />
                <span>{item.label}</span>
              </Flex>
            ))}
          </Flex>
        </Flex>

        {/* Mobile: the same axes as a plain list under the chart (the chart shows only numbers). */}
        <Box
          as='ol'
          m='0'
          p='0'
          listStyleType='none'
          display={{ base: 'block', lg: 'none' }}
        >
          {axes.map((item, index) => (
            <AxisRow
              key={item.name}
              index={index}
              name={item.name}
              text={item.text}
              active={false}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
