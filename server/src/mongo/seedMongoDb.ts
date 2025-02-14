import fs from "fs";
import path from "path";

import { getMongoConnection, closeMongoConnection } from "../mongo";

async function seedMongoDb() {
    try {
        const mongo = await getMongoConnection();

        const fixturesPath = path.join(__dirname, "testFixtures");
        const files = fs.readdirSync(fixturesPath).filter((file) => file.endsWith(".json"));

        for (const file of files) {
            const collectionName = file.replace(".json", "");
            const filePath = path.join(fixturesPath, file);
            const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

            if (!Array.isArray(jsonData)) {
                console.error(`❌ ${file} does not contain an array. Skipping...`);
                continue;
            }

            const collection = mongo.collection(collectionName);
            const existingCount = await collection.countDocuments();

            if (existingCount === 0) {
                await collection.insertMany(jsonData as any);
                console.log(`✅ Inserted ${jsonData.length} documents into ${collectionName}`);
            } else {
                console.log(`⚠️ Skipping ${collectionName}: Collection already contains data`);
            }
        }
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        await closeMongoConnection();
    }
}

seedMongoDb();
