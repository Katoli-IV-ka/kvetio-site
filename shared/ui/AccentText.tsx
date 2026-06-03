import { Box } from '@chakra-ui/react';
import { gradientAccent } from '../theme/colors';

export function AccentText({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as='span'
      bg={gradientAccent}
      bgClip='text'
      color='transparent'
    >
      {children}
    </Box>
  );
}
