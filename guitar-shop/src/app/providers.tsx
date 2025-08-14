// app/providers.tsx
"use client";
import { ApolloProvider } from "@apollo/client";
import { makeClient } from "@/app/lib/apollo-client";
import { LanguageProvider } from "@/lib/i18n";

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = makeClient();
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>{children}</LanguageProvider>
    </ApolloProvider>
  );
}
