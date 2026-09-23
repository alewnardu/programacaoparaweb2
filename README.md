# 🌐 Atividade Prática Avaliativa (A1) — Programação para Web II

> Projeto desenvolvido para a disciplina **Programação para Web II**, do curso de **Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)** — 4º período, **UNITINS — Palmas/TO**.

Esta etapa do projeto tem como objetivo praticar a criação de uma API REST com **Node.js e Express**, utilizando **Prisma ORM** para comunicação com um banco de dados **PostgreSQL**, com toda a aplicação executada em um ambiente **Docker Compose**.

O projeto utiliza dois serviços principais:

* 🟢 **Node.js** — aplicação/API
* 🐘 **PostgreSQL** — banco de dados

A comunicação entre os serviços é realizada por meio de uma **rede Docker do tipo bridge**, enquanto os dados do PostgreSQL são persistidos por meio de um **volume Docker**.

---

## 📚 Objetivo da atividade

Nesta etapa foram praticados os seguintes conceitos:

* Criação de uma API REST com **Express**
* Criação de um ambiente Node.js utilizando **Docker**
* Criação de um banco de dados PostgreSQL em container
* Orquestração de múltiplos containers com **Docker Compose**
* Criação e utilização de uma rede Docker
* Persistência de dados utilizando volumes
* Configuração de variáveis de ambiente
* Modelagem de dados utilizando **Prisma ORM**
* Utilização do **Prisma Adapter para PostgreSQL**
* Criação de operações básicas de CRUD
* Testes dos endpoints utilizando **Postman**

---

## 🧩 Arquitetura do projeto

A aplicação é composta por dois serviços principais:

```text
┌───────────────────────────────────────────────┐
│              Docker Compose                  │
│                                               │
│  ┌─────────────────┐     ┌─────────────────┐  │
│  │   Node / API    │     │   PostgreSQL    │  │
│  │                 │     │                 │  │
│  │  Express        │────▶│  Database       │  │
│  │  Prisma         │     │                 │  │
│  │  Port: 3000     │     │  Port: 5432     │  │
│  └─────────────────┘     └─────────────────┘  │
│           │                       │            │
│           └──── progweb2_network ─┘            │
│                                               │
│                  Volume                        │
│             PostgreSQL data                    │
└───────────────────────────────────────────────┘
```

O container da API acessa o PostgreSQL através da rede Docker utilizando o **nome do serviço do banco**, e não `localhost`.

Por exemplo:

```text
db:5432
```

A porta publicada do PostgreSQL é utilizada para acesso externo ao container, enquanto a comunicação entre os serviços utiliza a rede interna do Docker.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia                | Utilização                         |
| ------------------------- | ---------------------------------- |
| 🟢 **Node.js**            | Runtime da aplicação               |
| ⚡ **Express**             | Framework para criação da API REST |
| 🐘 **PostgreSQL**         | Banco de dados relacional          |
| 🔷 **Prisma ORM**         | ORM e modelagem do banco           |
| 🔌 **@prisma/adapter-pg** | Adapter do Prisma para PostgreSQL  |
| 🐳 **Docker**             | Containerização                    |
| 🐳 **Docker Compose**     | Orquestração dos serviços          |
| 📦 **npm**                | Gerenciamento de dependências      |
| 📮 **Postman**            | Testes dos endpoints               |

### Versões principais

* **Node.js:** 24
* **Prisma:** 7.10.0
* **PostgreSQL:** 17
* **Express:** 5.x

---

## 📋 Pré-requisitos

Para executar o projeto, é necessário possuir:

* [Docker](https://www.docker.com/)
* Docker Compose
* Git

Não é necessário instalar o Node.js ou PostgreSQL diretamente na máquina.

A aplicação Node.js e o banco PostgreSQL são executados dentro dos containers definidos no `docker-compose.yml`.

---

# 🚀 Instalação e execução

## 1. Clonar o repositório

```bash
git clone https://github.com/alewnardu/programacaoparaweb2.git
```

## 2. Acessar o projeto

```bash
cd programacaoparaweb2
```

## 3. Acessar a branch da Aula 07

```bash
git checkout feature/aula07/dockerizando-api-com-docker-compose
```

## 4. Iniciar os serviços

Execute:

```bash
docker compose up --build -d
```

O parâmetro `--build` força a reconstrução da imagem da aplicação.

O parâmetro `-d` executa os containers em segundo plano.

Para acompanhar os logs:

```bash
docker compose logs -f
```

---

# 🐳 Serviços Docker

O `docker-compose.yml` define dois serviços principais.

## API

Container:

```text
progweb2_app
```

A aplicação Node.js é executada na porta:

```text
3000
```

A API pode ser acessada pelo host através de:

```text
http://localhost:3000
```

## PostgreSQL

Container:

```text
progweb2_db
```

O PostgreSQL utiliza a porta padrão interna:

```text
5432
```

A porta publicada no host pode ser utilizada para acessar o banco externamente através de ferramentas como DBeaver.

Dentro da rede Docker, a aplicação Node.js acessa o banco utilizando o nome do serviço:

```text
db:5432
```

> **Importante:** dentro do container da API, `localhost` representa o próprio container da API. Para acessar o PostgreSQL, deve ser utilizado o nome do serviço do banco definido no Docker Compose.

---

# 🌐 Rede Docker

O projeto utiliza uma rede Docker dedicada:

```yaml
networks:
  progweb2_network:
    driver: bridge
```

Essa rede permite que os containers da aplicação e do banco se comuniquem diretamente.

A comunicação ocorre aproximadamente da seguinte maneira:

```text
progweb2_app
      │
      │ progweb2_network
      │
      ▼
    db:5432
      │
      ▼
progweb2_db
```

O Docker fornece resolução de nomes entre os serviços da rede. Dessa forma, a aplicação não precisa conhecer o endereço IP interno do container PostgreSQL.

---

# 💾 Persistência do banco de dados

O PostgreSQL utiliza um **volume Docker** para manter os dados armazenados mesmo quando o container é recriado.

Isso evita que os dados sejam perdidos simplesmente ao executar:

```bash
docker compose down
```

O volume somente é removido quando explicitamente solicitado, por exemplo:

```bash
docker compose down --volumes
```

> ⚠️ A remoção do volume apaga os dados persistidos pelo PostgreSQL.

---

# 🔷 Prisma ORM

O projeto utiliza o **Prisma ORM** para realizar o mapeamento entre a aplicação Node.js e o PostgreSQL.

O schema está localizado em:

```text
prisma/schema.prisma
```

A comunicação com o PostgreSQL utiliza:

```text
@prisma/adapter-pg
```

O projeto possui atualmente apenas um modelo:

```prisma
model Users {
  id    String @id @default(uuid())
  name  String @db.VarChar(100)
  email String @unique @db.VarChar(100)

  @@map("users")
}
```

Esse modelo representa a tabela:

```text
users
```

no banco PostgreSQL.

### Estrutura do modelo

| Campo   | Tipo     | Característica              |
| ------- | -------- | --------------------------- |
| `id`    | `String` | UUID gerado automaticamente |
| `name`  | `String` | Obrigatório                 |
| `email` | `String` | Obrigatório e único         |

---

# 🔄 Migrações do Prisma

Depois de iniciar os containers, as migrações podem ser executadas dentro do container da aplicação:

```bash
docker exec -it progweb2_app npx prisma migrate dev
```

O Prisma utiliza o arquivo:

```text
prisma/schema.prisma
```

para determinar a estrutura do banco.

As migrações ficam armazenadas em:

```text
prisma/migrations/
```

---

# ⚙️ Gerar o Prisma Client

Para gerar ou atualizar o cliente Prisma:

```bash
docker exec -it progweb2_app npx prisma generate
```

O cliente gerado é utilizado pela aplicação para executar operações no banco de dados.

---

# 📦 Dependências

As dependências do projeto são instaladas durante a construção da imagem Docker.

Caso seja necessário executar manualmente dentro do container:

```bash
docker exec -it progweb2_app npm install
```

Para consultar as dependências instaladas:

```bash
docker exec -it progweb2_app npm list
```

---

# 🌐 API REST

A API foi desenvolvida utilizando **Express** e possui operações básicas de CRUD para o recurso `Users`.

A URL base da API é:

```text
http://localhost:3000/api/users
```

## Endpoints

| Método   | Endpoint         | Operação          |
| -------- | ---------------- | ----------------- |
| `POST`   | `/api/users`     | Criar usuário     |
| `GET`    | `/api/users`     | Listar usuários   |
| `GET`    | `/api/users/:id` | Consultar usuário |
| `PUT`    | `/api/users/:id` | Atualizar usuário |
| `DELETE` | `/api/users/:id` | Excluir usuário   |

---

## ➕ Criar usuário

```http
POST /api/users
```

Exemplo de requisição:

```json
{
  "name": "Manuel Bandeira",
  "email": "manuel.bandeira@email.com"
}
```

Exemplo de URL:

```text
http://localhost:3000/api/users
```

---

## 📋 Listar usuários

```http
GET /api/users
```

Exemplo:

```text
http://localhost:3000/api/users
```

---

## 🔎 Consultar usuário

```http
GET /api/users/:id
```

Exemplo:

```text
http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

O `id` deve corresponder ao UUID de um usuário existente.

---

## ✏️ Atualizar usuário

```http
PUT /api/users/:id
```

Exemplo:

```text
http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

Corpo da requisição:

```json
{
  "name": "Manuel Bandeira Atualizado",
  "email": "manuel.atualizado@email.com"
}
```

---

## 🗑️ Excluir usuário

```http
DELETE /api/users/:id
```

Exemplo:

```text
http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

O usuário identificado pelo UUID será removido do banco de dados.

---

# 📮 Testando com Postman

O projeto disponibiliza uma coleção do Postman:

```text
api_docker_aula07.postman_collection.json
```

Para importar:

1. Abra o **Postman**.
2. Selecione **Import**.
3. Selecione o arquivo `api_docker_aula07.postman_collection.json`.
4. Importe a coleção.
5. Execute as requisições disponíveis.

A coleção permite testar as operações CRUD implementadas para `Users`.

---

# 📁 Estrutura do projeto

A estrutura principal do projeto é:

```text
programacaoparaweb2/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   └── users.controller.js
│   │
│   ├── generated/
│   │   └── prisma/
│   │
│   ├── lib/
│   │   └── prisma.js
│   │
│   ├── routers/
│   │   └── users.routers.js
│   │
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── api_docker_aula07.postman_collection.json
├── docker-compose.yml
├── Dockerfile
├── LICENSE
├── package-lock.json
├── package.json
├── prisma.config.ts
└── README.md
```

### Organização da aplicação

**`src/server.js`**

Responsável pela inicialização do servidor Express, configuração dos middlewares e registro das rotas.

**`src/routers/users.routers.js`**

Define as rotas HTTP relacionadas ao recurso `Users`.

**`src/controllers/users.controller.js`**

Contém as funções responsáveis pelo processamento das requisições e pela comunicação com o Prisma.

**`src/lib/prisma.js`**

Centraliza a configuração dainstância do Prisma Client e do adapter PostgreSQL.

**`prisma/schema.prisma`**

Define a modelagem utilizada pelo Prisma.

**`docker-compose.yml`**

Define os serviços, portas, volumes, dependências e rede utilizada pelo ambiente.

**`Dockerfile`**

Define a imagem utilizada para executar a aplicação Node.js.

---

# 🧪 Comandos úteis

## Verificar containers

```bash
docker ps
```

## Visualizar todos os containers

```bash
docker ps -a
```

## Visualizar logs

```bash
docker compose logs -f
```

## Visualizar somente os logs da API

```bash
docker compose logs -f app
```

## Visualizar logs do PostgreSQL

```bash
docker compose logs -f db
```

## Acessar o container da aplicação

```bash
docker exec -it progweb2_app sh
```

## Gerar o Prisma Client

```bash
docker exec -it progweb2_app npx prisma generate
```

## Executar migrações

```bash
docker exec -it progweb2_app npx prisma migrate dev
```

## Abrir o Prisma Studio

```bash
docker exec -it progweb2_app npx prisma studio
```

> O Prisma Studio disponibiliza uma interface para visualizar e manipular os dados do banco de dados.

## Reiniciar os serviços

```bash
docker compose restart
```

## Parar os serviços

```bash
docker compose down
```

## Parar os serviços e remover os volumes

```bash
docker compose down --volumes
```

> ⚠️ Esse comando remove também o volume utilizado para persistência do PostgreSQL.

## Reconstruir e iniciar

```bash
docker compose up --build -d
```

---

# ▶️ Execução completa

A partir de um clone novo:

```bash
git clone https://github.com/alewnardu/programacaoparaweb2.git

cd programacaoparaweb2

git checkout feature/aula07/dockerizando-api-com-docker-compose

docker compose up --build -d

docker exec -it progweb2_app npx prisma migrate dev

docker exec -it progweb2_app npx prisma generate
```

Após a inicialização, a API estará disponível em:

```text
http://localhost:3000
```

E os endpoints de usuários estarão disponíveis em:

```text
http://localhost:3000/api/users
```

---

# 🔐 Variáveis de ambiente

As configurações sensíveis e específicas do ambiente são armazenadas em variáveis de ambiente.

O projeto possui um arquivo de exemplo:

```text
.env.example
```

O arquivo `.env` é utilizado pela aplicação em execução.

A conexão do Prisma com o PostgreSQL utiliza a variável:

```text
DATABASE_URL
```

Em um ambiente Docker Compose, a conexão utiliza o nome do serviço PostgreSQL na rede interna do Docker.

Exemplo conceitual:

```text
postgresql://usuario:senha@db:5432/progweb2
```

> O arquivo `.env` não deve conter credenciais reais quando o projeto for compartilhado publicamente.

---

# 📝 Conceitos praticados

Esta atividade consolida os seguintes conceitos:

### Node.js

Execução de uma aplicação JavaScript no servidor utilizando Node.js.

### Express

Criação de uma API HTTP utilizando rotas, controllers e middlewares.

### Prisma

Mapeamento entre os modelos da aplicação e as tabelas do banco de dados.

### PostgreSQL

Banco de dados relacional utilizado para persistência dos usuários.

### Docker

Empacotamento e execução da aplicação em containers.

### Docker Compose

Definição e gerenciamento dos serviços que compõem o ambiente.

### Docker Network

Comunicação entre a API e o banco de dados através de uma rede privada.

### Docker Volume

Persistência dos dados do PostgreSQL fora do ciclo de vida do container.

### CRUD

Implementação das operações:

```text
Create → POST
Read   → GET
Update → PUT
Delete → DELETE
```

---

# 📄 Licença

Este projeto está disponibilizado sob a licença **MIT**.

Consulte o arquivo [`LICENSE`](LICENSE) para obter os termos completos da licença.

---

# 👨‍💻 Autor

**Leonardo Araujo**

[![GitHub](https://img.shields.io/badge/GitHub-alewnardu-181717?style=for-the-badge\&logo=github)](https://github.com/alewnardu)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Leonardo%20Araujo-0A66C2?style=for-the-badge\&logo=linkedin)](https://www.linkedin.com/in/leonardo-araujo-8b8637247/)

---

# 🤝 Contribuições

Contribuições, sugestões e feedbacks são bem-vindos.

Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua alteração:

```bash
git checkout -b minha-alteracao
```

3. Realize as modificações.
4. Faça o commit:

```bash
git commit -m "feat: descrição da alteração"
```

5. Envie a branch:

```bash
git push origin minha-alteracao
```

6. Abra um Pull Request.

---

<p align="center">
  Desenvolvido como parte das atividades acadêmicas da disciplina
  <strong>Programação para Web II</strong> — UNITINS.
</p>
```