import { Box, Heading } from '@chakra-ui/react';
import { LAND_PATH } from '../../../shared/landing/geometry';
import { cities, networkCopy } from '../../../shared/landing/site-content';
import { amber, ink } from '../../../shared/theme/palette';

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
                  stroke={amber}
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
                fill={amber}
                stroke={ink}
                strokeWidth='1.2'
              />
            ))}
            {cities.map((city) => (
              <g key={`tag-${city.name}`}>
                <rect
                  rx='2'
                  x={city.labelX - city.labelWidth / 2}
                  y={city.labelY - 8.5}
                  width={city.labelWidth}
                  height='17'
                  fill={amber}
                />
                <text
                  x={city.labelX}
                  y={city.labelY + 3.4}
                  textAnchor='middle'
                  fill={ink}
                  fontFamily="'Inter', system-ui, sans-serif"
                  fontWeight='600'
                  fontSize='10'
                >
                  {city.name}
                </text>
              </g>
            ))}
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
