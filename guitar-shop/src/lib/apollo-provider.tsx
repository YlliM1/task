'use client'

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import { LanguageProvider } from '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>{children}</LanguageProvider>
    </ApolloProvider>
  );
}