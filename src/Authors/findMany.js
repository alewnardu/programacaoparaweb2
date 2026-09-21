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
    const result = await prisma.author.findMany({
        include: {
            books: true,
        }
    });

    console.log(JSON.stringify(result, null, 2));
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
