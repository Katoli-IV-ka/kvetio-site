import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { CLARITY_ID, CookieConsent } from '../features/consent/ui/CookieConsent';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Component {...pageProps} />
      <CookieConsent clarityId={CLARITY_ID} />
    </ChakraProvider>
  );
}
