/* eslint-disable no-unused-vars */
import type { Collection, Db } from "mongodb";

import type PricingPlan from "../types/PricingPlan";

export default interface MongoConnection extends Db {
    collection<T>(name: string): Collection<T extends { [key: string]: any } ? T : never>;
    collection(name: "pricingPlans"): Collection<PricingPlan>;
}
