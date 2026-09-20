# programacaoparaweb2
Repositório da Disciplina Programação para Web II (TADS - 4º Período - PALMAS)

## Instalação

### Gerando o arquivo package.json
docker run --rm -it -v "${PWD}:/app" -w /app node:24-alpine npm init -y

### Docker
docker-compose up -d

### Instalação da dependência prisma a partor de um conteiner temporário
docker exec -it progweb2_app npm install prisma@7.10.0 -D --verbose

### Inicializando a estrutura prisma/schema.prisma
docker exec -it progweb2_app npx prisma init --datasource-provider "postgresql"

````
Criando uma migração limpa para adição de código SQL, os quais o prisma não dá suporte.
Nesse caso (CHECK, VIEW, PROCEDURE, FUNCTION, etc.) deverão ser criadas manualmente.
````    
#### Criando migração para edição manual
docker exec -it progweb2_app npx prisma migrate dev --create-only --name add_nome_entidade_constraints

### Executando a migração
docker exec -it progweb2_app npx prisma migrate dev

docker exec -it progweb2_app npx prisma migrate reset