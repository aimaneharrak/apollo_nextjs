import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { gql } from 'graphql-tag';

import {
    typeDefs,
    resolvers,
} from "@/graphql/server_utils";
import allowCors from "@/utils/cors";


const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

const handler = allowCors(startServerAndCreateNextHandler(server))

export { handler as GET, handler as POST };
