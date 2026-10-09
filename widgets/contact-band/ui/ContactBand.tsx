import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { hairline, ink } from '../../../shared/theme/palette';

export function ContactBand() {
  return (
    <Box
      as='section'
      id='contact'
      bg={ink}
      px={{ base: 5, md: 16 }}
      pt={{ base: 14, md: 20 }}
      pb={{ base: 14, md: 20 }}
      borderTopWidth='1px'
      borderColor={hairline}
    >
      <Flex
        direction='column'
        gap={7}
        maxW='1312px'
        mx='auto'
      >
        <Heading
          as='h2'
          m='0'
          maxW='640px'
          fontSize={{ base: '30px', md: '40px' }}
          lineHeight='1.08'
          fontWeight='500'
          letterSpacing='-0.01em'
          textTransform='uppercase'
          color='white'
        >
          Tell us what your model is missing
        </Heading>
        <Box>
          <Link
            href='/contact'
            display='inline-flex'
            alignItems='center'
            h='44px'
            px={6}
            borderRadius='full'
            bg='white'
            fontSize='12px'
            fontWeight='600'
            color={ink}
            _hover={{ textDecoration: 'none' }}
          >
            Contact Us
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
