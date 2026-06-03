import { Box, HStack, Text } from '@chakra-ui/react';
import { trustSignals } from '../../../shared/landing/content';
import { brandCyan, glassBorder, gradientAccent } from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';

export function TrustStrip() {
  return (
    <FadeUp>
      <Box
        mb={{ base: 16, md: 24 }}
        borderWidth='1px'
        borderColor={glassBorder}
        borderRadius={{ base: '36px', md: 'full' }}
        bg='rgba(255,255,255,0.055)'
        backdropFilter='blur(18px)'
        overflow='hidden'
      >
        <HStack
          gap={0}
          flexWrap={{ base: 'wrap', lg: 'nowrap' }}
          justify='center'
        >
          {trustSignals.map((signal, index) => (
            <HStack
              key={signal}
              gap={3}
              px={{ base: 4, md: 7 }}
              py={4}
              flex={{ base: '1 1 50%', md: '1 1 auto' }}
              justify='center'
              borderRightWidth={{ base: '0', lg: index === trustSignals.length - 1 ? '0' : '1px' }}
              borderColor='whiteAlpha.200'
            >
              <Box
                w='8px'
                h='8px'
                borderRadius='full'
                bg={index === 0 ? gradientAccent : brandCyan}
                boxShadow='0 0 18px rgba(52,213,255,0.8)'
              />
              <Text
                color='rgba(255,255,255,0.86)'
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='700'
                whiteSpace='nowrap'
              >
                {signal}
              </Text>
            </HStack>
          ))}
        </HStack>
      </Box>
    </FadeUp>
  );
}
