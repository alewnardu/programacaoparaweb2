# 🌐 Programação para Web II

Repositório da disciplina **Programação para Web II** do curso de **Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)** — 4º período, **UNITINS — Palmas/TO**.

Este projeto tem como objetivo apoiar as atividades práticas da disciplina, utilizando tecnologias modernas para desenvolvimento de aplicações web, APIs, bancos de dados e ferramentas de desenvolvimento.

---

## 🚀 Tecnologias

* 🟢 **Node.js 24**
* 🟢 **Express**
* 🐘 **PostgreSQL 17**
* 🔷 **Prisma ORM 7.10.0**
* 🔌 **Prisma PostgreSQL Adapter**
* 🐳 **Docker / Docker Compose**
* 📦 **npm**

---

## 📁 Estrutura do projeto

```text
programacaoparaweb2/
├── prisma/
│   ├── migrations/
|   └── schema.prisma
│
├── src/
│   └── ...
│
├── .env
├── .gitignore
├── docker-compose.yaml
├── Dockerfile
├── LICENSE
├── package-lock.json
├── package.json
├── prisma.config.ts
└── README.md
```

---

# ⚙️ Instalação

## 1. Criando o `package.json`

Como o projeto utiliza Docker para executar o Node.js, o `package.json` pode ser criado através de um container temporário:

```bash
docker run --rm -it -v "${PWD}:/app" -w /app node:24-alpine npm init -y
```

---

## 2. Iniciando os containers

Suba os serviços definidos no Docker Compose:

```bash
docker compose up -d
```

Para verificar os containers:

```bash
docker compose ps
```

---

# 🔷 Prisma ORM

O projeto utiliza o **Prisma ORM 7.10.0** para mapeamento das entidades, criação de migrations e acesso ao PostgreSQL.

## 3. Instalando o Prisma CLI

Instale o Prisma como dependência de desenvolvimento:

```bash
docker exec -it progweb2_app npm install prisma@7.10.0 -D
```

## 4. Instalando o Prisma Client

O Prisma Client é utilizado pela aplicação durante sua execução, portanto é instalado como dependência normal:

```bash
docker exec -it progweb2_app npm install @prisma/client@7.10.0
```

## 5. Instalando o adapter PostgreSQL

O Prisma 7 utiliza um driver adapter para realizar a conexão com o PostgreSQL:

```bash
docker exec -it progweb2_app npm install @prisma/adapter-pg pg
```

---

# 🗄️ Configurando o Prisma

## 6. Inicializando o Prisma

Para criar a estrutura inicial do Prisma:

```bash
docker exec -it progweb2_app npx prisma init --datasource-provider "postgresql"
```

Isso cria, entre outros arquivos:

```text
prisma/
└── schema.prisma
```

Após configurar o schema, gere o Prisma Client:

```bash
docker exec -it progweb2_app npx prisma generate
```

---

# 🔄 Migrations

As migrations são utilizadas para controlar a evolução da estrutura do banco de dados.

## Criando uma migration

Depois de alterar o `schema.prisma`, crie uma migration:

```bash
docker exec -it progweb2_app npx prisma migrate dev --name nome_da_migration
```

O Prisma irá:

1. comparar o `schema.prisma` com o banco;
2. gerar o SQL da migration;
3. criar a pasta da migration;
4. executar a migration no banco;
5. registrar a migration no histórico do Prisma.

---

## 📝 Criando uma migration para edição manual

Alguns recursos específicos do PostgreSQL podem precisar ser escritos manualmente no SQL, como:

* `CHECK CONSTRAINT`
* `VIEW`
* `FUNCTION`
* `PROCEDURE`
* `TRIGGER`
* outros recursos específicos do PostgreSQL

Para criar a migration **sem aplicá-la ao banco**, utilize:

```bash
docker exec -it progweb2_app npx prisma migrate dev --create-only --name add_nome_entidade_constraints
```

O Prisma criará a estrutura:

```text
prisma/
└── migrations/
    └── 2026xxxxxxxxxx_add_nome_entidade_constraints/
        └── migration.sql
```

O arquivo `migration.sql` pode então ser editado manualmente.

Por exemplo:

```sql
ALTER TABLE "courses"
ADD CONSTRAINT "courses_duration_check"
CHECK ("duration" > 0);
```

Depois de revisar o SQL, execute as migrations pendentes:

```bash
docker exec -it progweb2_app npx prisma migrate dev
```

> **Importante:** `--create-only` impede a aplicação da migration naquele comando. Se posteriormente for executado `prisma migrate dev`, as migrations pendentes serão aplicadas ao banco.

---

# 🔄 Resetando o banco de desenvolvimento

Para apagar o banco/schema de desenvolvimento e executar novamente as migrations existentes:

```bash
docker exec -it progweb2_app npx prisma migrate reset
```

> ⚠️ **Atenção:** o comando apaga os dados do banco de desenvolvimento.

Utilize esse comando somente quando estiver trabalhando com um banco em que a perda dos dados seja aceitável.

---

# 🔍 Comandos úteis do Prisma

### Verificar a versão

```bash
docker exec -it progweb2_app npx prisma --version
```

### Gerar o Prisma Client

```bash
docker exec -it progweb2_app npx prisma generate
```

### Criar e aplicar migration

```bash
docker exec -it progweb2_app npx prisma migrate dev --name nome_da_migration
```

### Criar migration sem aplicar

```bash
docker exec -it progweb2_app npx prisma migrate dev --create-only --name nome_da_migration
```

### Resetar banco de desenvolvimento

```bash
docker exec -it progweb2_app npx prisma migrate reset
```

### Abrir o Prisma Studio

```bash
docker exec -it progweb2_app npx prisma studio
```

---

# 🐳 Comandos Docker úteis

### Iniciar os containers

```bash
docker compose up -d
```

### Parar os containers

```bash
docker compose down
```

### Ver status

```bash
docker compose ps
```

### Visualizar logs

```bash
docker compose logs -f
```

### Visualizar logs da aplicação

```bash
docker compose logs -f progweb2_app
```

---

## 📚 Objetivo

Este repositório é utilizado como ambiente de estudos e desenvolvimento prático da disciplina **Programação para Web II**, permitindo aplicar conceitos de:

* Desenvolvimento backend;
* APIs REST;
* Node.js;
* Express;
* PostgreSQL;
* Modelagem de dados;
* ORM para integração entre aplicação e banco de dados;
* Docker para isolar configurações e manter serviços;

---

<div align="center">

**Programação para Web II • TADS • 4º Período**

📍 Palmas — Tocantins

</div>
