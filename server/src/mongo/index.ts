import type MongoConnection from "./MongoConnection";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI;

let client: MongoClient | null = null;
let mongo: MongoConnection;

export async function getMongoConnection(): Promise<MongoConnection> {
    if (!uri) {
        throw new Error("MONGO_URI is not defined in .env file");
    }

    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        mongo = client.db();
    }

    return mongo;
}

export async function closeMongoConnection() {
    if (client) {
        await client.close();
        client = null;
    }
}
