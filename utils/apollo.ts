import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "/api/graphql"
})
