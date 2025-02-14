import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { typeDefs, resolvers } from "./graphql";

const app: Application = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = 4000;

async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/graphql`));
}

startServer();
