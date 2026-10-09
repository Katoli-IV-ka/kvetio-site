import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { hairline, ink, muted } from '../../../shared/theme/palette';
import { Flower } from '../../../shared/ui/Flower';

export function SiteFooter() {
  return (
    <Box
      as='footer'
      bg={ink}
      px={{ base: 5, md: 16 }}
      pb={10}
    >
      <Box
        maxW='1312px'
        mx='auto'
      >
        <Flex
          wrap='wrap'
          align='center'
          justify='space-between'
          gap={4}
          pt={6}
          borderTopWidth='1px'
          borderColor={hairline}
          fontSize='12px'
          color={muted}
        >
          <Flex
            align='center'
            gap={2}
            color='white'
          >
            <Flower size={16} />
            <span>Kvetio</span>
          </Flex>
          <Flex
            gap={6}
            wrap='wrap'
          >
            <Link
              href='mailto:contact@kvet.io'
              color='inherit'
            >
              contact@kvet.io
            </Link>
            <Link
              href='https://www.linkedin.com/company/kvet-io'
              target='_blank'
              rel='noopener noreferrer'
              color='inherit'
            >
              LinkedIn
            </Link>
            <Link
              href='https://www.instagram.com/kvetio'
              target='_blank'
              rel='noopener noreferrer'
              color='inherit'
            >
              Instagram
            </Link>
            <Link
              href='/privacy-policy'
              color='inherit'
            >
              Privacy Policy
            </Link>
          </Flex>
          <Text m='0'>© {new Date().getFullYear()} Kvetio</Text>
        </Flex>
      </Box>
    </Box>
  );
}
