import { Heading, Stack, Text } from '@chakra-ui/react';
import { softText } from '../theme/colors';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Stack
      gap={3}
      maxW='3xl'
    >
      {eyebrow && (
        <Text
          color='whiteAlpha.600'
          fontSize='xs'
          fontWeight='700'
          letterSpacing='0'
          textTransform='uppercase'
        >
          {eyebrow}
        </Text>
      )}
      <Heading
        as='h2'
        fontSize={{ base: '3xl', md: '5xl' }}
        lineHeight='1'
        fontWeight='600'
      >
        {title}
      </Heading>
      {description && (
        <Text
          color={softText}
          fontSize={{ base: 'sm', md: 'lg' }}
          maxW='2xl'
        >
          {description}
        </Text>
      )}
    </Stack>
  );
}
