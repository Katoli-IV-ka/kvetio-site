import { Box, Heading, Text } from '@chakra-ui/react';
import { modalityCopy } from '../../../shared/landing/site-content';
import { cream, ink, muted } from '../../../shared/theme/palette';

const LINE = '#3a3f4a';
const MONO = "'JetBrains Mono', ui-monospace, monospace";

/** Heading on top, then one numbered column per data type hanging off a single horizontal line. */
export function Modalities() {
  const rows = modalityCopy.rows;
  return (
    <Box
      as='section'
      id='modalities'
      bg={ink}
      px={{ base: 5, md: 16 }}
      py={{ base: 14, md: 24 }}
      overflow='hidden'
    >
      <Box
        maxW='1312px'
        mx='auto'
      >
        <Box mb={{ base: 10, md: 20 }}>
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

        <Box
          as='ol'
          m='0'
          p='0'
          listStyleType='none'
          display='grid'
          gridTemplateColumns={{ base: '1fr', md: `repeat(${rows.length}, 1fr)` }}
          rowGap={{ base: 8, md: 0 }}
        >
          {rows.map((row, index) => {
            const last = index === rows.length - 1;
            return (
              <Box
                as='li'
                key={row.title}
                position='relative'
                pr={{ base: 0, md: 6 }}
                pl={{ base: 7, md: 0 }}
                css={{
                  /* mobile: vertical rail */
                  '@media (max-width: 47.99em)': {
                    borderLeft: `1px solid ${LINE}`,
                  },
                }}
              >
                <Text
                  m='0'
                  fontFamily={MONO}
                  fontSize='13px'
                  letterSpacing='0.04em'
                  color={muted}
                >
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text
                  mt={3}
                  mb='0'
                  fontSize='16px'
                  fontWeight='700'
                  letterSpacing='-0.005em'
                  textTransform='uppercase'
                  color='white'
                  minH={{ base: 'auto', md: '2.6em' }}
                >
                  {row.title}
                </Text>
                {/* desktop: horizontal line with a dot per column (the last one runs off the edge) */}
                <Box
                  display={{ base: 'none', md: 'block' }}
                  position='relative'
                  h='20px'
                  my={3}
                  mr={last ? { md: '-64px' } : '0'}
                >
                  <Box
                    position='absolute'
                    left='0'
                    right='0'
                    top='50%'
                    h='1px'
                    bg={LINE}
                  />
                  <Box
                    position='absolute'
                    left='0'
                    top='50%'
                    w='10px'
                    h='10px'
                    mt='-5px'
                    borderRadius='full'
                    bg={cream}
                  />
                </Box>
                {/* mobile: dot sits on the rail */}
                <Box
                  display={{ base: 'block', md: 'none' }}
                  position='absolute'
                  left='-5px'
                  top='4px'
                  w='9px'
                  h='9px'
                  borderRadius='full'
                  bg={cream}
                />
                <Text
                  m='0'
                  mt={{ base: 2, md: 0 }}
                  fontSize='14px'
                  lineHeight='1.55'
                  color={muted}
                  maxW='240px'
                >
                  {row.description}
                </Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
