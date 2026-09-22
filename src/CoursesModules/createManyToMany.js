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
    const result = await prisma.coursesModules.createMany({
        data: {
            moduleId: "c1a76ff0-002f-4c08-b51f-89eff9129e8f",
            courseId: "9679efd6-cd37-4014-b7f0-7c92ee3fffdb",
        },
    });

    console.log(result);
};

main();