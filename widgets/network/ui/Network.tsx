import { Box, Heading } from '@chakra-ui/react';
import { LAND_PATH } from '../../../shared/landing/geometry';
import { cities, networkCopy } from '../../../shared/landing/site-content';
import { blue, ink } from '../../../shared/theme/palette';

/** Lettering size inside the 1000x560 map viewBox. */
const TEXT_EM = 13;

const textProps = {
  textAnchor: 'middle',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontWeight: 600,
  fontSize: TEXT_EM,
  letterSpacing: '-0.01em',
} as const;

export function Network() {
  const names = cities.map((city) => city.name).join(', ');
  return (
    <Box
      as='section'
      id='network'
      bg={ink}
      px={{ base: 5, md: 16 }}
      pt={{ base: 12, md: 18 }}
      pb={14}
    >
      <Box
        display='flex'
        flexDirection='column'
        gap={10}
        maxW='1312px'
        mx='auto'
      >
        <Heading
          as='h2'
          m='0'
          fontSize={{ base: '34px', md: '52px' }}
          lineHeight='1.08'
          fontWeight='500'
          letterSpacing='-0.02em'
          color='white'
        >
          {networkCopy.title}
        </Heading>
        <Box
          w='100%'
          minW='0'
        >
          <svg
            viewBox='0 0 1000 560'
            role='img'
            aria-label={`World map with marked cities: ${names}`}
            style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}
          >
            <path
              d={LAND_PATH}
              fill='#ffffff'
            />
            {cities.map((city) => (
              <g key={`line-${city.name}`}>
                <line
                  x1={city.x}
                  y1={city.y}
                  x2={city.labelX}
                  y2={city.labelY}
                  stroke={ink}
                  strokeWidth='2.4'
                />
                <line
                  x1={city.x}
                  y1={city.y}
                  x2={city.labelX}
                  y2={city.labelY}
                  stroke={blue}
                  strokeWidth='0.9'
                />
              </g>
            ))}
            {cities.map((city) => (
              <circle
                key={`dot-${city.name}`}
                cx={city.x}
                cy={city.y}
                r='2.6'
                fill={blue}
                stroke={ink}
                strokeWidth='1.2'
              />
            ))}
            {cities.map((city) => {
              // The highlight is deliberately smaller than the lettering, like a marker
              // swiped carelessly under the word: the text bleeds out on every side.
              const textWidth = city.name.length * TEXT_EM * 0.58;
              const width = textWidth * 0.86;
              return (
                <g key={`tag-${city.name}`}>
                  <text
                    {...textProps}
                    x={city.labelX}
                    y={city.labelY + 4.6}
                    fill='none'
                    stroke={ink}
                    strokeWidth='2.6'
                    strokeLinejoin='round'
                  >
                    {city.name}
                  </text>
                  <rect
                    x={city.labelX - width / 2 + 1.5}
                    y={city.labelY - 4.2}
                    width={width}
                    height={TEXT_EM * 0.72}
                    fill={blue}
                    transform={`rotate(-1.2 ${city.labelX} ${city.labelY})`}
                  />
                  <text
                    {...textProps}
                    x={city.labelX}
                    y={city.labelY + 4.6}
                    fill='#ffffff'
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
