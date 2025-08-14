// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const makeClient = () =>
  new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            models: {
              keyArgs: ["brandId", "search", "type"],
              merge(existing = { items: [], total: 0 }, incoming, { args }) {
                const start = (args?.offset ?? 0);
                const merged = existing.items ? existing.items.slice(0) : [];
                for (let i = 0; i < incoming.items.length; ++i) {
                  merged[start + i] = incoming.items[i];
                }
                return { items: merged, total: incoming.total };
              },
            },
          },
        },
      },
    }),
  });
