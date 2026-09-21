import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

/**
 * Cria um autor e, ao mesmo tempo, o associa a dois livros, respeitando o relacionamento 1:N.
 */

async function main() {
    const result = await prisma.author.create({
        data: {
            name: "Paulo Reglus Neves Freire",
            books: {
                create: [
                    { name: "Pedagogia do Oprimido" },
                    { name: "À Sombra Desta Mangueira (1995)" }
                ],
            },
        },
        include: {
            books: true,
        }
    });

    console.log("Result:", result);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
