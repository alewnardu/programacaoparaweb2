import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const result = await prisma.courses.findMany({
        where: {
            id: "9679efd6-cd37-4014-b7f0-7c92ee3fffdb"
        },
        include: {
            modules: true,
        }
    });

    console.log(JSON.stringify(result, null, 2));
};

main();