# Portal do Trabalhador

Portal web para consulta de direitos trabalhistas, calculadoras, modelos de documentos e atendimento pelo assistente Gui.

## Estrutura

```text
backend/
  prisma/              Schema do banco de dados
  src/config/          Configuração de banco e migração inicial
  src/controllers/     Controladores da API
  src/middleware/      Middlewares Express
  src/repositories/    Acesso a dados
  src/routes/          Rotas HTTP
  src/services/        Serviços de chat e recomendações

frontend/
  public/modelos/      Arquivos DOCX disponíveis para download
  src/components/      Componentes de layout, admin e chatbot
  src/data/            Dados estáticos dos modelos
  src/img/             Imagens usadas pela interface
  src/pages/           Páginas da aplicação
  src/services/        Clientes HTTP do frontend
  src/utils/           Cálculos trabalhistas
```

## Requisitos

- Node.js 18 ou superior
- npm
- PostgreSQL, para uso do backend com banco persistente

## Variáveis de ambiente

Crie `backend/.env` manualmente:

```env
PORT=3001
DATABASE_URL=postgres://usuario:senha@host:5432/portal_trabalhador
CORS_ORIGIN=http://localhost:5173
ADMIN_API_KEY=sua-chave-admin
GROQ_API_KEY=sua-chave-groq
GROQ_MODEL=llama-3.1-8b-instant
```

`GROQ_API_KEY` é opcional para desenvolvimento. Sem ela, o Gui usa respostas locais.

## Instalação

Backend:

```bash
cd backend
npm install
npm run migrate
```

Frontend:

```bash
cd frontend
npm install
```

## Execução

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Por padrão, o frontend roda em `http://localhost:5173` e a API em `http://localhost:3001`.

## Build

```bash
cd backend
npm run build
```

```bash
cd frontend
npm run build
```

## Observações

- O projeto não mantém template de ambiente. Use a seção de variáveis deste README como referência.
- Conteúdos legais são informativos e devem ser revisados manualmente antes de uso profissional ou jurídico.
- As calculadoras usam tabelas e regras cadastradas no código; mantenha esses dados atualizados quando houver alteração oficial.
