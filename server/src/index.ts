import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { typeDefs, resolvers, GraphQLContext } from "./graphql";
import { getMongoConnection } from "./mongo";

const app: Application = express();

const PORT = 4000;

async function startServer() {
    try {
        const mongo = await getMongoConnection();
        const server = new ApolloServer<GraphQLContext>({
            typeDefs,
            resolvers,
            context: () => ({ mongo }),
            introspection: true,
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        });

        await server.start();
        server.applyMiddleware({ app, path: "/graphql" });

        if (require.main === module) {
            app.listen(PORT, () =>
                console.log(`Server running on http://localhost:${PORT}/graphql`)
            );
        }
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();
