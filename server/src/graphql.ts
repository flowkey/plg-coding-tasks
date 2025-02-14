import type MongoConnection from "./mongo/MongoConnection";

import { gql } from "apollo-server-express";

export type GraphQLContext = { mongo: Awaited<MongoConnection> };

export const typeDefs = gql`
    type Query {
        hello: String
        pricingPlans(countryCode: String): [PricingPlan!]!
    }

    type PricingPlan {
        _id: ID!
        billingFrequency: String!
        trialPeriodDays: Int
        isRecommended: Boolean
        currency: String!
        price: String!
    }
`;

export const resolvers = {
    Query: {
        hello: () => "Hello from GraphQL!",
        pricingPlans: async (
            _: any,
            { countryCode }: { countryCode: string },
            { mongo }: GraphQLContext
        ) => {
            try {
                const plans = await mongo.collection("pricingPlans").find().toArray();
                return plans.map((plan) => {
                    console.log("plan", plan);
                    const regionalPrice = plan.regionalPrices.find(
                        (p) => p.countryCode === countryCode
                    );

                    // Fallback to US price if regional price not found
                    const fallbackPrice = !regionalPrice
                        ? plan.regionalPrices.find((p) => p.countryCode === "US")
                        : null;

                    if (!regionalPrice && !fallbackPrice) {
                        throw new Error(`No valid price found for ${countryCode} or US fallback.`);
                    }

                    const { currency, price } = regionalPrice ?? fallbackPrice!;

                    return {
                        _id: plan._id,
                        billingFrequency: plan.billingFrequency,
                        trialPeriodDays: plan.trialPeriodDays,
                        isRecommended: plan.isRecommended,
                        currency,
                        price,
                    };
                });
            } catch (error) {
                console.error("Error fetching pricing plans:", error);
                throw new Error("Failed to fetch pricing plans");
            }
        },
    },
};
