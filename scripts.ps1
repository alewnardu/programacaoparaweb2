param(
    [Parameter(Position = 0)]
    [string]$Command,

    [Parameter(Position = 1)]
    [string]$Name
)

switch ($Command) {

    # ============================================================
    # DOCKER
    # ============================================================

    "up" {
        docker compose up -d
    }

    "down" {
        docker compose down
    }

    "restart" {
        docker compose restart
    }

    "build" {
        docker compose build
    }

    "rebuild" {
        docker compose down
        docker compose build --no-cache
        docker compose up -d
    }

    "ps" {
        docker compose ps
    }

    "logs" {
        docker compose logs -f
    }

    "logs-app" {
        docker compose logs -f app
    }

    "logs-db" {
        docker compose logs -f db
    }


    # ============================================================
    # POSTGRESQL
    # ============================================================

    "db" {
        docker exec -it progweb2_db psql -U progweb2
    }

    # ============================================================
    # NODE
    # ============================================================
    "node" {
        if ($Name) {
            docker exec -it progweb2_app node $Name
        }
        else {
            Write-Host "Informe o caminho do arquivo para o node executar."
            Write-Host "Exemplo: .\scripts.ps1 node src/Courses/create.js"
        }
    }


    # ============================================================
    # PRISMA - MIGRATIONS
    # ============================================================

    "migrate" {
        if ($Name) {
            docker exec -it progweb2_app npx prisma migrate dev --name $Name
        }
        else {
            docker exec -it progweb2_app npx prisma migrate dev
        }
    }

    "migrate-create" {
        if ($Name) {
            docker exec -it progweb2_app npx prisma migrate dev --create-only --name $Name
        }
        else {
            Write-Host "Informe o nome da migration."
            Write-Host "Exemplo: .\dev.ps1 migrate-create add_course_constraints"
        }
    }

    "reset" {
        docker exec -it progweb2_app npx prisma migrate reset --force
    }

    "status" {
        docker exec -it progweb2_app npx prisma migrate status
    }

    "generate" {
        docker exec -it progweb2_app npx prisma generate
    }


    # ============================================================
    # PRISMA - STUDIO
    # ============================================================

    "studio" {
        docker exec -it progweb2_app npx prisma studio --browser none --port 51212
    }


    # ============================================================
    # AJUDA
    # ============================================================

    default {
        Write-Host ""
        Write-Host "========================================"
        Write-Host "  Programacao para Web II - Dev Tools"
        Write-Host "========================================"
        Write-Host ""

        Write-Host "DOCKER"
        Write-Host "----------------------------------------"
        Write-Host "  .\dev.ps1 up"
        Write-Host "      Inicia os containers"
        Write-Host ""
        Write-Host "  .\dev.ps1 down"
        Write-Host "      Para e remove os containers"
        Write-Host ""
        Write-Host "  .\dev.ps1 restart"
        Write-Host "      Reinicia os containers"
        Write-Host ""
        Write-Host "  .\dev.ps1 build"
        Write-Host "      Constrói as imagens"
        Write-Host ""
        Write-Host "  .\dev.ps1 rebuild"
        Write-Host "      Reconstrói as imagens sem cache"
        Write-Host ""
        Write-Host "  .\dev.ps1 ps"
        Write-Host "      Lista os containers"
        Write-Host ""
        Write-Host "  .\dev.ps1 logs"
        Write-Host "      Exibe os logs de todos os serviços"
        Write-Host ""
        Write-Host "  .\dev.ps1 logs-app"
        Write-Host "      Exibe os logs da aplicação"
        Write-Host ""
        Write-Host "  .\dev.ps1 logs-db"
        Write-Host "      Exibe os logs do PostgreSQL"
        Write-Host ""

        Write-Host "POSTGRESQL"
        Write-Host "----------------------------------------"
        Write-Host "  .\dev.ps1 db"
        Write-Host "      Acessa o PostgreSQL pelo terminal"
        Write-Host ""

        Write-Host "PRISMA - MIGRATIONS"
        Write-Host "----------------------------------------"
        Write-Host "  .\dev.ps1 migrate"
        Write-Host "      Cria e aplica uma migration"
        Write-Host ""
        Write-Host "  .\dev.ps1 migrate nome"
        Write-Host "      Cria e aplica uma migration com nome"
        Write-Host ""
        Write-Host "  .\dev.ps1 migrate-create nome"
        Write-Host "      Cria uma migration sem aplicar"
        Write-Host ""
        Write-Host "  .\dev.ps1 reset"
        Write-Host "      Reseta o banco e reaplica as migrations"
        Write-Host ""
        Write-Host "  .\dev.ps1 status"
        Write-Host "      Exibe o status das migrations"
        Write-Host ""
        Write-Host "  .\dev.ps1 generate"
        Write-Host "      Gera o Prisma Client"
        Write-Host ""

        Write-Host "PRISMA - STUDIO"
        Write-Host "----------------------------------------"
        Write-Host "  .\dev.ps1 studio"
        Write-Host "      Inicia o Prisma Studio"
        Write-Host ""
    }
}