import { useEffect } from 'react';
import Header from '@components/header';
import Footer from '@components/footer';
import Router from 'next/router';
import * as gtag from '../lib/gtag';

import '@styles/index.css';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <main className="flex flex-col">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
};

export default App;
