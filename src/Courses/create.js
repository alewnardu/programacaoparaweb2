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
    const result = await prisma.courses.create({
        data: {
            name: "Redes de Computadores",
            description: "Este módulo aborda os conceitos de redes e seus componentes.",
            duration: 60,
        },
        include: {
            modules: true,
        }
    });

    console.log(result);
};

main();