import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';
import { AppProps } from 'next/app';
import { Preflight } from '../styles/preflight';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={teamsDarkTheme}>
        <Preflight />
        <Component {...pageProps} />
      </FluentProvider>
    </QueryClientProvider>
  );
}
