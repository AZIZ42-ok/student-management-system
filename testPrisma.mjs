import db from './src/prismaClient.mjs';

async function testPrisma() {
    try {
        await db.connect();

        console.log("Prisma connected successfully!");

        await db.close();

    } catch (error) {
        console.log("Connection failed:", error.message);
    }
}

testPrisma();