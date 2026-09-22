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
    const result = await prisma.modules.findMany({
        where: {
            id: "4bd1b5a5-422c-4c5f-acbf-aa1e6b892f48"
        },
        include: {
            courses: true,
        }
    });

    console.log(JSON.stringify(result, null, 2));
};

main();