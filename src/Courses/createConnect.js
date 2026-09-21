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
            name: "Docker para Iniciantes",
            duration: 30,
            description: "Do zero ao container",

            teacher: {
                connect: {
                    name: "Flávia Fauro",
                }
            }
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