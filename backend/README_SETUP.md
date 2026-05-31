# Backend

API Express do Portal do Trabalhador.

## Instalação

```bash
npm install
```

## Configuração

Crie `backend/.env` com:

```env
PORT=3001
DATABASE_URL=postgres://usuario:senha@host:5432/portal_trabalhador
CORS_ORIGIN=http://localhost:5173
ADMIN_API_KEY=sua-chave-admin
GROQ_API_KEY=sua-chave-groq
GROQ_MODEL=llama-3.1-8b-instant
```

## Banco de dados

Crie o banco PostgreSQL e rode:

```bash
npm run migrate
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```
