import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRef } from 'react';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false } },
    });
    queryClientRef.current = queryClient;
  }

  return (
    <>
      <Head>
        <title>Kakao Mobility Clone</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default App;
