import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html
        lang='en'
        suppressHydrationWarning
      >
        <Head>
          <link
            rel='icon'
            href='/favicon.ico?v=4'
            sizes='48x48'
          />
          <link
            rel='icon'
            href='/favicon.svg?v=4'
            type='image/svg+xml'
          />
          <link
            rel='icon'
            href='/icon-192.png?v=4'
            type='image/png'
            sizes='192x192'
          />
          <link
            rel='apple-touch-icon'
            href='/apple-touch-icon.png?v=4'
          />
          <link
            rel='preconnect'
            href='https://fonts.googleapis.com'
          />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400&display=swap'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
