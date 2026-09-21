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
    const result = await prisma.course.create({
        data: {
            name: "Php para web",
            duration: 80,
            description: "Desenvolvendo de apps web",
            fkTeacherId: "da1f288c-7b98-410a-8215-359fb19cb161",
        }
    });

    console.log(result);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });