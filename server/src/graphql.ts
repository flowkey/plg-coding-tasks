import type MongoConnection from "./mongo/MongoConnection";

import { gql } from "apollo-server-express";

export type GraphQLContext = { mongo: Awaited<MongoConnection> };

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL!",
  },
};
