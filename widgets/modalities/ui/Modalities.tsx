import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FLOWER_PATH } from '../../../shared/landing/geometry';
import { modalityCopy } from '../../../shared/landing/site-content';
import { cream, ink, muted } from '../../../shared/theme/palette';

const FAN_START_Y = [20, 83.8, 147.5, 211.2, 275, 338.8, 402.5, 466.2, 530];

/** Fan of curves converging into one line, tangent to the axis (bowing outward). */
const fanPaths = FAN_START_Y.map((y) => {
  const c1 = (y + (275 - y) * 0.9).toFixed(1);
  return `M0 ${y.toFixed(1)} C 90 ${c1}, 190 275, 330 275`;
});

export function Modalities() {
  return (
    <Box
      as='section'
      id='modalities'
      bg={ink}
      px={{ base: 5, md: 16 }}
      py={{ base: 14, md: 24 }}
    >
      <Box
        maxW='1312px'
        mx='auto'
      >
        <Box mb={14}>
          <Heading
            as='h2'
            m='0'
            maxW='760px'
            fontSize={{ base: '30px', md: '40px' }}
            lineHeight='1.08'
            fontWeight='500'
            letterSpacing='-0.01em'
            textTransform='uppercase'
            color='white'
          >
            {modalityCopy.title}
          </Heading>
          <Text
            mt={5}
            mb='0'
            maxW='640px'
            fontSize='15px'
            lineHeight='1.55'
            color={muted}
          >
            {modalityCopy.description}
          </Text>
        </Box>

        <Flex align='flex-start'>
          <Box
            flex={{ base: '1 1 100%', lg: '0 0 460px' }}
            maxW='100%'
          >
            {modalityCopy.rows.map((row) => (
              <Box
                key={row.title}
                h={{ base: 'auto', lg: '110px' }}
                mb={{ base: 7, lg: 0 }}
                boxSizing='border-box'
              >
                <Text
                  m='0'
                  fontSize='16px'
                  fontWeight='700'
                  color='white'
                >
                  {row.title}
                </Text>
                <Text
                  mt='10px'
                  mb='0'
                  maxW='420px'
                  fontSize='12px'
                  lineHeight='1.55'
                  color={muted}
                >
                  {row.description}
                </Text>
              </Box>
            ))}
          </Box>
          <Box
            display={{ base: 'none', lg: 'block' }}
            flex='1 1 0'
            minW='0'
          >
            <svg
              viewBox='0 0 700 550'
              role='img'
              aria-label='Many sources converging into one line'
              style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}
            >
              <g
                fill='none'
                stroke={cream}
                strokeWidth='1.3'
              >
                {fanPaths.map((d) => (
                  <path
                    key={d}
                    d={d}
                  />
                ))}
              </g>
              <path
                d='M330 275 H 700'
                fill='none'
                stroke={cream}
                strokeWidth='1'
              />
              <svg
                x='520'
                y='190.5'
                width='84'
                height='84'
                viewBox='0 0 15 15'
                fill='none'
              >
                <path
                  d={FLOWER_PATH}
                  fill='#ffffff'
                />
              </svg>
            </svg>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
