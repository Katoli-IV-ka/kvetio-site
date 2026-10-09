import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { teamCopy } from '../../../shared/landing/site-content';
import { hairline, ink, inkSoft } from '../../../shared/theme/palette';
import { Grain } from '../../../shared/ui/Grain';

export function Team() {
  return (
    <Box
      as='section'
      id='team'
      bg={ink}
      px={{ base: 5, md: 16 }}
      py={{ base: 14, md: 24 }}
    >
      <Flex
        wrap='wrap'
        align='center'
        justify='space-between'
        gap={12}
        maxW='1312px'
        mx='auto'
      >
        <Box
          flex='1 1 380px'
          minW='0'
          maxW='660px'
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
            {teamCopy.title}
          </Heading>
          <Text
            mt={7}
            mb='0'
            fontSize='18px'
            lineHeight='1.6'
            fontWeight='300'
            color='#b9bdc7'
          >
            {teamCopy.description}
          </Text>
        </Box>
        <Box
          flex='0 1 448px'
          minW='260px'
          aspectRatio='1 / 1'
          position='relative'
          overflow='hidden'
          borderRadius='28px'
          borderWidth='1px'
          borderColor={hairline}
          bg={inkSoft}
        >
          <Image
            src='/images/v2/team.jpg'
            alt='Motion-capture studio with a performer on screen'
            loading='lazy'
            position='absolute'
            inset='0'
            w='100%'
            h='100%'
            objectFit='cover'
            objectPosition='42% 50%'
          />
          <Grain opacity={0.45} />
        </Box>
      </Flex>
    </Box>
  );
}
