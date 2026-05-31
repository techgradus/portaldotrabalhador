import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

import artigosRouter from './routes/artigos';
import calculadorasRouter from './routes/calculadoras';
import chatRouter from './routes/chat';
import adminRouter from './routes/admin';
import recomendacoesRouter from './routes/recomendacoes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

const chatLimiter = rateLimit({ windowMs: 60 * 1000, max: 20 });

app.use('/api/artigos', artigosRouter);
app.use('/api/calculadoras', calculadorasRouter);
app.use('/api/chat', chatLimiter, chatRouter);
app.use('/api/admin', adminRouter);
app.use('/api/recomendacoes', recomendacoesRouter);

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Portal do Trabalhador API',
    version: '1.0.0',
    description: 'Documentação de API gerada para o backend do Portal do Trabalhador.',
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL || `http://localhost:${PORT}`,
      description: 'Servidor local ou configurado via variável de ambiente',
    },
  ],
  paths: {
    '/api': {
      get: {
        summary: 'Raiz da API',
        responses: {
          '200': { description: 'API online' },
        },
      },
    },
    '/api/health': {
      get: {
        summary: 'Verificar status da API',
        responses: {
          '200': { description: 'API saudável' },
        },
      },
    },
    '/api/chat': {
      post: {
        summary: 'Enviar mensagem para o chatbot',
        responses: {
          '200': { description: 'Resposta do chatbot' },
        },
      },
    },
    '/api/artigos': {
      get: {
        summary: 'Listar artigos',
        responses: { '200': { description: 'Lista de artigos' } },
      },
      post: {
        summary: 'Criar novo artigo',
        responses: { '201': { description: 'Artigo criado' } },
      },
    },
    '/api/artigos/{slug}': {
      get: {
        summary: 'Buscar artigo por slug',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Artigo encontrado' } },
      },
    },
    '/api/calculadoras/rescisao': {
      post: {
        summary: 'Calcular rescisão',
        responses: { '200': { description: 'Resultado da rescisão' } },
      },
    },
    '/api/calculadoras/salario-liquido': {
      post: {
        summary: 'Calcular salário líquido',
        responses: { '200': { description: 'Resultado do salário líquido' } },
      },
    },
    '/api/calculadoras/fgts': {
      post: {
        summary: 'Calcular FGTS',
        responses: { '200': { description: 'Resultado do FGTS' } },
      },
    },
    '/api/recomendacoes': {
      get: {
        summary: 'Recomendar artigos relacionados',
        parameters: [{ name: 'calculadoras', in: 'query', required: false, schema: { type: 'string' } }],
        responses: { '200': { description: 'Artigos relacionados às calculadoras informadas' } },
      },
    },
  },
};

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api/docs.json', (_req, res) => res.json(swaggerDocument));

app.get('/api', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'API do Portal do Trabalhador online.',
    frontend: 'Abra http://localhost:3001/ quando o frontend/dist existir, ou http://localhost:5173/ em desenvolvimento.',
    endpoints: ['/api/health', '/api/chat', '/api/docs'],
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
const frontendIndexPath = path.join(frontendDistPath, 'index.html');

if (fs.existsSync(frontendIndexPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }

    res.sendFile(frontendIndexPath);
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
