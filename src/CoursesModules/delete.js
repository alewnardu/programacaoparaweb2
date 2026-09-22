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
    const result = await prisma.coursesModules.delete({
        where: {
            id: "4ca60902-6a44-4568-9f22-88869fa13ace",
        }
    });

    console.log(result);
};

main();