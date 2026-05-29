# Setup do Backend

## 1. Instalar dependências
```
npm install
```

## 2. Criar arquivo .env
Copie o .env.example e preencha com seus dados:
```
copy .env.example .env
```
Edite o `.env` e coloque sua chave da Groq, o modelo desejado e os dados do PostgreSQL.

## 3. Criar banco de dados
No PostgreSQL, crie o banco:
```sql
CREATE DATABASE portal_trabalhador;
```
Depois rode as migrations e sincronize o schema Prisma:
```
npm run migrate
```

## 4. Iniciar o servidor
```
npm run dev
```
