import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import '../styles/globals.css';

export const UserContext = React.createContext([] as any[]);

function MyApp({ Component, pageProps }: AppProps) {
  const [me, setMe] = useState();

  useEffect(() => {
    fetch('/api/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(setMe);
  }, []);

  return <div>
    <Head>
      <title>Snaps</title>
      <meta name="description" content="Show appreciation for teammates and colleagues through digital collectibles." />
      <link rel="icon" href="/snaps_100.png" />
    </Head>
    <UserContext.Provider value={[me, setMe]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  </div>
}

export default MyApp;
