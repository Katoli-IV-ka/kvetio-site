import { HStack, Link, Text, VStack } from '@chakra-ui/react';
import { glassBorder, mutedText } from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';

const socialLinkStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '9',
  h: '9',
  borderRadius: 'full',
  borderWidth: '1px',
  borderColor: 'whiteAlpha.500',
  _hover: { bg: 'whiteAlpha.200' },
} as const;

export function Footer() {
  return (
    <FadeUp>
      <VStack
        gap={5}
        px={{ base: 6, md: 10 }}
        py={{ base: 7, md: 9 }}
        color={mutedText}
        borderTopWidth='1px'
        borderColor={glassBorder}
      >
        <Text
          textAlign='center'
          fontSize='sm'
        >
          Email: contact@kvet.io
        </Text>
        <HStack gap={3}>
          <Link
            href='https://www.instagram.com/kvetio'
            aria-label='Instagram'
            target='_blank'
            rel='noopener noreferrer'
            {...socialLinkStyles}
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='white'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect
                x='2'
                y='2'
                width='20'
                height='20'
                rx='5'
                ry='5'
              />
              <circle
                cx='12'
                cy='12'
                r='4'
              />
              <circle
                cx='17.5'
                cy='6.5'
                r='1'
                fill='white'
                stroke='none'
              />
            </svg>
          </Link>
          <Link
            href='https://www.linkedin.com/company/kvet-io'
            aria-label='LinkedIn'
            target='_blank'
            rel='noopener noreferrer'
            {...socialLinkStyles}
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='white'
            >
              <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
              <rect
                x='2'
                y='9'
                width='4'
                height='12'
              />
              <circle
                cx='4'
                cy='4'
                r='2'
              />
            </svg>
          </Link>
        </HStack>
      </VStack>
    </FadeUp>
  );
}
