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
    const result = await prisma.coursesModules.create({
        data: {
            course: {
                create: {
                    duration: 60,
                    name: "Sistemas de Informação",
                    description: "Curso de Sistemas de Informação",
                }
            },
            module: {
                create: {
                    name: "Sinais e sistemas de comunicação",
                    description: "Módulo de Sistemas de Informação",
                }
            }
        }
    });

    console.log(result);
};

main();