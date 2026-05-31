# Documento de Requisitos - Portal do Trabalhador

## 1. Introducao

### 1.1 Proposito do Documento
Este documento especifica os requisitos funcionais e nao funcionais do sistema **Portal do Trabalhador**, desenvolvido para a disciplina do 4o Semestre de Analise e Desenvolvimento de Sistemas (ADS) da UniFECAF, com apresentacao na ExpoTech 2026.

### 1.2 Escopo do Sistema
O Portal do Trabalhador e uma aplicacao web completa que centraliza informacoes sobre direitos trabalhistas, leis, calculadoras de beneficios e modelos de documentos. O sistema conta com um assistente virtual (chatbot) baseado em inteligencia artificial para tirar duvidas dos usuarios e um sistema de recomendacao de artigos baseado em aprendizado de maquina.

### 1.3 Definicoes e Abreviaturas

| Sigla | Significado |
|-------|-------------|
| RF | Requisito Funcional |
| RNF | Requisito Nao Funcional |
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| LLM | Large Language Model |
| TF-IDF | Term Frequency-Inverse Document Frequency |
| JWT | JSON Web Token |
| ORM | Object-Relational Mapping |

### 1.4 Publico-Alvo
- **Usuario final:** Trabalhadores brasileiros de baixa e media renda que necessitam de informacoes claras sobre seus direitos trabalhistas
- **Administrador:** Equipe de gestao de conteudo responsavel por publicar e manter artigos, calculadoras e modelos de documentos

---

## 2. Descricao do Problema

### 2.1 Contexto
Muitos trabalhadores brasileiros tem dificuldade de acessar informacoes claras e confiaveis sobre seus direitos trabalhistas. A legislacao e complexa, os sites governamentais sao pouco intuitivos e a consultoria juridica particular e inacessivel para a maioria da populacao. Existe uma demanda por uma plataforma centralizada que reuna leis, calculadoras de verbas rescisorias e outros beneficios, modelos de documentos e um canal de atendimento automatizado.

### 2.2 Objetivo do Sistema
Desenvolver uma aplicacao web moderna, responsiva e inteligente que democratize o acesso a informacoes trabalhistas, oferecendo:
- Consulta de leis e artigos explicativos sobre direitos do trabalhador
- Calculadoras interativas para simulacao de valores de rescisao, ferias, horas extras, etc.
- Modelos de documentos trabalhistas para download
- Chatbot com IA para esclarecimento de duvidas em linguagem natural
- Sistema de recomendacao personalizado de conteudos baseado no comportamento do usuario

### 2.3 Stakeholders

| Stakeholder | Interesse no Sistema |
|-------------|----------------------|
| Trabalhadores | Obter informacoes claras sobre direitos trabalhistas |
| Gestores de Conteudo | Publicar e gerenciar artigos, calculadoras e documentos |
| Avaliadores Academicos | Validar aplicacao dos conceitos das disciplinas do semestre |

---

## 3. Requisitos Funcionais

### RF-001 - Cadastro e Gerenciamento de Artigos
**Prioridade:** Alta
**Descricao:** O sistema deve permitir que administradores criem, editem, excluam e consultem artigos sobre direitos trabalhistas. Cada artigo deve conter titulo, slug unico, resumo, corpo, categoria, tempo de leitura e status (rascunho/publicado).
**Entradas:** Titulo, slug, resumo, corpo, categoria_id, tempo_leitura, status
**Saidas:** Artigo criado/atualizado/listado/removido
**Regras de Negocio:**
- O slug deve ser unico no sistema
- Titulo e corpo sao campos obrigatorios
- Artigos com status "rascunho" nao aparecem na area publica

### RF-002 - Cadastro e Gerenciamento de Categorias
**Prioridade:** Alta
**Descricao:** O sistema deve permitir a organizacao de artigos em categorias tematicas (ex: CLT, FGTS, Ferias, Rescisao).
**Entradas:** Nome e slug da categoria
**Saidas:** Categoria criada/listada
**Regras de Negocio:** Nome e slug devem ser unicos.

### RF-003 - Exibicao de Artigos na Area Publica
**Prioridade:** Alta
**Descricao:** Usuarios finais devem poder visualizar a lista de artigos publicados e acessar o conteudo completo de cada artigo via navegacao por slug.
**Entradas:** Filtro opcional por categoria
**Saidas:** Lista de artigos ou detalhe de um artigo

### RF-004 - Calculadoras Trabalhistas
**Prioridade:** Alta
**Descricao:** O sistema deve disponibilizar calculadoras interativas para simulacao de valores trabalhistas (rescicao, ferias, horas extras, decimo terceiro, etc.).
**Entradas:** Dados especificos de cada calculadora (salario, dias trabalhados, etc.)
**Saidas:** Resultado do calculo com detalhamento
**Regras de Negocio:** As metricas de uso das calculadoras devem ser registradas para fins de recomendacao.

### RF-005 - Modelos de Documentos para Download
**Prioridade:** Media
**Descricao:** O sistema deve oferecer modelos de documentos trabalhistas (cartas, reclamacoes, acordos) disponiveis para visualizacao e download.
**Entradas:** Selecao do modelo desejado
**Saidas:** Documento formatado disponibilizado ao usuario

### RF-006 - ChatBot com Inteligencia Artificial
**Prioridade:** Alta
**Descricao:** O sistema deve disponibilizar um chatbot interativo capaz de responder perguntas sobre direitos trabalhistas em linguagem natural, utilizando um modelo de linguagem (LLM).
**Entradas:** Mensagem do usuario e historico de conversa
**Saidas:** Resposta gerada pela IA e session ID
**Regras de Negocio:**
- A conversa deve manter contexto via historico
- Cada sessao deve ter um identificador unico
- As mensagens devem ser logadas no banco de dados

### RF-007 - Sistema de Recomendacao de Artigos
**Prioridade:** Media
**Descricao:** O sistema deve recomendar artigos relevantes aos usuarios com base nas calculadoras que acessaram, utilizando algoritmo de similaridade semantica (TF-IDF + similaridade de cosseno).
**Entradas:** Lista de calculadoras acessadas pelo usuario
**Saidas:** Lista de artigos recomendados ordenados por relevancia

### RF-008 - Area Administrativa
**Prioridade:** Alta
**Descricao:** O sistema deve possuir uma area administrativa protegida para gestao de conteudo, incluindo dashboards, gerenciamento de artigos, calculadoras e metricas de uso.
**Entradas:** Credenciais de acesso
**Saidas:** Interface administrativa com operacoes CRUD

### RF-009 - Log de Conversas do ChatBot
**Prioridade:** Media
**Descricao:** Todas as interacoes com o chatbot devem ser registradas no banco de dados para analise e melhoria continua do sistema.
**Entradas:** Session ID, mensagem do usuario, resposta do bot
**Saidas:** Registro persistido na tabela ChatLog

### RF-010 - Registro de Metricas de Calculadoras
**Prioridade:** Media
**Descricao:** O uso das calculadoras deve ser registrado para alimentar o sistema de recomendacao e gerar estatisticas de uso.
**Entradas:** Tipo da calculadora utilizada
**Saidas:** Registro persistido na tabela MetricasCalculadora

---

## 4. Requisitos Nao Funcionais

### RNF-001 - Desempenho
**Categoria:** Performance
**Descricao:** O sistema deve responder as requisicoes em ate 2 segundos para operacoes de leitura e ate 3 segundos para operacoes de escrita. O endpoint de chat deve responder em ate 5 segundos (considerando latencia da API externa).
**Metrica:** Tempo de resposta dos endpoints medido via logs.

### RNF-002 - Disponibilidade
**Categoria:** Confiabilidade
**Descricao:** O sistema deve estar disponivel 99% do tempo durante o periodo de avaliacao academica.

### RNF-003 - Seguranca
**Categoria:** Seguranca
**Descricao:**
- A API deve utilizar Helmet para protecao de headers HTTP
- Rate limiting deve ser aplicado no endpoint de chat (maximo 20 requisicoes por minuto)
- CORS deve ser configurado para permitir apenas a origem do frontend
- Variaveis sensiveis (chaves de API, dados de banco) devem ser armazenadas em variaveis de ambiente

### RNF-004 - Usabilidade
**Categoria:** Interface
**Descricao:** A interface deve ser responsiva, adaptando-se a dispositivos moveis e desktops. A navegacao deve ser intuitiva, permitindo que usuarios encontrem informacoes em ate 3 cliques.

### RNF-005 - Escalabilidade
**Categoria:** Arquitetura
**Descricao:** A arquitetura deve seguir principios SOLID, com separacao clara entre camadas (controllers, services, repositories), facilitando manutencao e futuras extensoes.

### RNF-006 - Documentacao da API
**Categoria:** Manutenibilidade
**Descricao:** Todos os endpoints da API REST devem ser documentados via Swagger/OpenAPI, acessivel em rota dedicada (/api-docs).

### RNF-007 - Compatibilidade de Banco de Dados
**Categoria:** Persistencia
**Descricao:** O sistema deve utilizar PostgreSQL como banco de dados relacional, acessado via Prisma ORM, com suporte a migrations e geracao automatica de cliente.

### RNF-008 - Tecnologias Front-End
**Categoria:** Tecnologia
**Descricao:** O front-end deve ser desenvolvido em React.js com TypeScript, utilizando Vite como bundler, e consumir a API via Axios com React Query para gerenciamento de estado assincrono.

### RNF-009 - Inteligencia Artificial
**Categoria:** Tecnologia
**Descricao:** O chatbot deve utilizar uma API de modelo de linguagem compativel com OpenAI (Groq API) e o sistema de recomendacao deve implementar algoritmo TF-IDF com similaridade de cosseno.

### RNF-010 - Equipe e Metodologia
**Categoria:** Gerenciamento
**Descricao:** O projeto deve ser desenvolvido em equipe de 3 a 5 integrantes, utilizando Git para controle de versionamento e organizado com metodologias ageis.

---

## 5. Regras de Negocio

| ID | Regra |
|----|-------|
| RN-001 | Artigos com status "rascunho" nao sao exibidos na area publica |
| RN-002 | O slug de cada artigo e categoria deve ser unico no sistema |
| RN-003 | O chatbot deve limitar 20 requisicoes por minuto por IP |
| RN-004 | O sistema de recomendacao utiliza apenas calculadoras acessadas como entrada |
| RN-005 | Todas as interacoes com o chatbot sao logadas para auditoria |
| RN-006 | Campos obrigatorios para criacao de artigo: titulo, slug e corpo |

---

## 6. Matriz de Rastreabilidade

| Requisito | Tecnologia | Status |
|-----------|-----------|--------|
| RF-001 a RF-003 (Artigos) | React + Express + Prisma + PostgreSQL | Implementado |
| RF-004 (Calculadoras) | React + Express | Implementado |
| RF-005 (Modelos) | React + arquivos estaticos | Implementado |
| RF-006 (ChatBot) | Groq SDK (LLM) | Implementado |
| RF-007 (Recomendacao) | TF-IDF + Cosseno (JS) | Implementado |
| RF-008 (Area Admin) | React Router + React | Implementado |
| RF-009 / RF-010 (Logs) | Prisma + PostgreSQL | Implementado |
