import { Box, Heading } from '@chakra-ui/react';
import { cities, networkCopy } from '../../../shared/landing/site-content';
import { blue, ink } from '../../../shared/theme/palette';

/** Left-to-right order of the tags along the arc (roughly west to east). */
const ORDER = ['New York', 'Madrid', 'Berlin', 'Prague', 'Warsaw', 'Minsk', 'Dubai', 'Tokyo'];
const NAMES = ORDER.filter((name) => cities.some((city) => city.name === name));

type Layout = {
  width: number;
  height: number;
  cx: number;
  cy: number;
  radius: number;
  /** Half-span of the tag fan, degrees from the vertical. */
  span: number;
  /** Distance from the arc to the tag centre, one entry per alternating step. */
  offsets: number[];
  font: number;
};

const DESKTOP: Layout = {
  width: 1312,
  height: 460,
  cx: 656,
  cy: 700,
  radius: 600,
  span: 62,
  offsets: [72],
  font: 16,
};

const MOBILE: Layout = {
  width: 390,
  height: 270,
  cx: 195,
  cy: 700,
  radius: 520,
  span: 14,
  offsets: [44, 92],
  font: 12,
};

const polar = (layout: Layout, angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: layout.cx + radius * Math.sin(rad), y: layout.cy - radius * Math.cos(rad) };
};

function Arc({ layout, label }: { layout: Layout; label: string }) {
  const { width, height, cx, cy, radius, span, offsets, font } = layout;
  const last = NAMES.length - 1;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role='img'
      aria-label={label}
      style={{ display: 'block', width: '100%', height: 'auto', overflow: 'hidden' }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill='none'
        stroke='#3a404c'
        strokeWidth='1.4'
      />
      {NAMES.map((name, index) => {
        const angle = -span + (2 * span * index) / last;
        const offset = offsets[index % offsets.length] ?? 60;
        const dot = polar(layout, angle, radius);
        const end = polar(layout, angle, radius + offset - font * 1.0);
        const tag = polar(layout, angle, radius + offset);
        const textWidth = name.length * font * 0.58;
        const plate = textWidth + font * 1.1;
        const textProps = {
          textAnchor: 'middle',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: font,
          letterSpacing: '-0.01em',
        } as const;
        return (
          <g key={name}>
            <line
              x1={dot.x}
              y1={dot.y}
              x2={end.x}
              y2={end.y}
              stroke={blue}
              strokeWidth='0.9'
            />
            <circle
              cx={dot.x}
              cy={dot.y}
              r='3.2'
              fill={blue}
              stroke={ink}
              strokeWidth='1.4'
            />
            <rect
              x={tag.x - plate / 2}
              y={tag.y - font * 0.82}
              width={plate}
              height={font * 1.64}
              fill={blue}
              transform={`rotate(-1 ${tag.x} ${tag.y})`}
            />
            <text
              {...textProps}
              x={tag.x}
              y={tag.y + font * 0.35}
              fill='#ffffff'
            >
              {name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Network() {
  const label = `Cities we shoot in: ${NAMES.join(', ')}`;
  return (
    <Box
      as='section'
      id='network'
      bg={ink}
      px={{ base: 5, md: 16 }}
      pt={{ base: 12, md: 18 }}
      pb='0'
      overflow='hidden'
    >
      <Box
        maxW='1312px'
        mx='auto'
      >
        <Heading
          as='h2'
          m='0'
          mb={{ base: 6, md: 10 }}
          textAlign='center'
          fontSize={{ base: '30px', md: '40px' }}
          lineHeight='1.08'
          fontWeight='500'
          letterSpacing='-0.01em'
          textTransform='uppercase'
          color='white'
        >
          {networkCopy.title}
        </Heading>
        <Box display={{ base: 'none', md: 'block' }}>
          <Arc
            layout={DESKTOP}
            label={label}
          />
        </Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <Arc
            layout={MOBILE}
            label={label}
          />
        </Box>
      </Box>
    </Box>
  );
}
