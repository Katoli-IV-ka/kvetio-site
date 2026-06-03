import { Box, type BoxProps } from '@chakra-ui/react';
import { glassBg, glassBorder } from '../theme/colors';

type GlassPanelProps = BoxProps & { hoverable?: boolean };

export function GlassPanel({ children, hoverable, ...props }: GlassPanelProps) {
  return (
    <Box
      bg={glassBg}
      borderWidth='1px'
      borderColor={glassBorder}
      boxShadow='0 24px 80px rgba(0,0,0,0.22)'
      backdropFilter='blur(18px)'
      {...(hoverable && {
        cursor: 'pointer',
        transition: 'transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
        _hover: {
          transform: 'translateY(-6px)',
          borderColor: 'whiteAlpha.400',
          boxShadow: '0 32px 96px rgba(0,0,0,0.32)',
        },
      })}
      {...props}
    >
      {children}
    </Box>
  );
}
