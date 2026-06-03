import Image from 'next/image';
import { Box, Button, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import { AccentText } from '../../../shared/ui/AccentText';
import { brandPrimary } from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';

const tags = [
  'Visual Data',
  'Audio Data',
  'VFX Assets',
  'Annotated Data',
  'Custom Data Production',
  'Dataset Licensing',
  'Healthcare Data',
  'Agro Data',
];

export function Tags() {
  return (
    <FadeUp>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify='space-between'
        gap={8}
        mb={{ base: 16, md: 24 }}
      >
        <VStack
          gap={8}
          align='start'
        >
          <HStack
            justifyContent='space-between'
            w='full'
          >
            <Heading
              as='h2'
              fontSize={{ base: '2xl', md: '4xl' }}
              lineHeight='1.05'
            >
              Fueling your AI
              <br />
              with <AccentText>quality data</AccentText>
            </Heading>
            <Box
              position='relative'
              w={{ base: '180px', md: '240px' }}
              h={{ base: '104px', md: '152px' }}
            >
              <Image
                src='/design/logo-white.png'
                alt='Kvetio'
                fill
                sizes='240px'
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </HStack>
          <Stack
            wrap='wrap'
            direction='row'
            gap={3}
            w={{ base: 'full', md: '70%' }}
          >
            {tags.map((label) => (
              <Button
                key={label}
                minW='max-content'
                px={4}
                bg={brandPrimary}
                borderRadius='full'
                color='white'
                transition='background 0.2s ease, transform 0.2s ease'
                _hover={{ transform: 'translateY(-2px)' }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </VStack>
      </Stack>
    </FadeUp>
  );
}
