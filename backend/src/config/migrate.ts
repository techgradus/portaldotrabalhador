import 'dotenv/config';
import { execSync } from 'child_process';
import { isDatabaseConfigured, prisma } from './database';

async function migrate() {
  if (!isDatabaseConfigured) {
    throw new Error('DATABASE_URL não definida. Crie o arquivo backend/.env antes de rodar as migrações.');
  }

  try {
    console.log('Sincronizando schema Prisma...');
    execSync('npx prisma db push', { stdio: 'inherit' });

    console.log('Garantindo categorias iniciais...');
    await prisma.categoria.createMany({
      data: [
        { nome: 'Direitos Básicos', slug: 'direitos-basicos' },
        { nome: 'Jornada', slug: 'jornada' },
        { nome: 'Férias', slug: 'ferias' },
        { nome: 'Rescisão', slug: 'rescisao' },
        { nome: 'FGTS', slug: 'fgts' },
        { nome: 'Licenças', slug: 'licencas' },
        { nome: 'Processos', slug: 'processos' },
      ],
      skipDuplicates: true,
    });

    console.log('Banco de dados criado e schema atualizado com sucesso.');
  } catch (err) {
    console.error('Erro durante a migração:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
