import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <Head>
      <title>Snaps</title>
      <meta name="description" content="Show appreciation for teammates and colleagues through digital collectibles." />
      <link rel="icon" href="/snaps_100.png" />
    </Head>
    <Component {...pageProps} />
  </div>
}

export default MyApp;
