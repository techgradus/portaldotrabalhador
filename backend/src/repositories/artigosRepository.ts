import { prisma } from '../config/database';

export interface Artigo {
  id: number;
  titulo: string;
  slug: string;
  resumo: string | null;
  corpo?: string | null;
  categoria_nome: string | null;
  tempo_leitura: string | null;
  status: string;
  updated_at: string;
}

function mapArtigo(artigo: {
  id: number;
  titulo: string;
  slug: string;
  resumo: string | null;
  corpo: string;
  categoria: { nome: string } | null;
  tempo_leitura: string | null;
  status: string;
  updated_at: Date;
}): Artigo {
  return {
    id: artigo.id,
    titulo: artigo.titulo,
    slug: artigo.slug,
    resumo: artigo.resumo,
    corpo: artigo.corpo,
    categoria_nome: artigo.categoria?.nome ?? null,
    tempo_leitura: artigo.tempo_leitura,
    status: artigo.status,
    updated_at: artigo.updated_at.toISOString(),
  };
}

export async function findAllPublicados(categoriaSlug?: string): Promise<Artigo[]> {
  const artigos = await prisma.artigo.findMany({
    where: {
      status: 'publicado',
      categoria: categoriaSlug
        ? {
            is: {
              slug: categoriaSlug,
            },
          }
        : undefined,
    },
    orderBy: { updated_at: 'desc' },
    include: { categoria: true },
  });

  return artigos.map(mapArtigo);
}

export async function findBySlug(slug: string): Promise<Artigo | null> {
  const artigo = await prisma.artigo.findFirst({
    where: {
      slug,
      status: 'publicado',
    },
    include: { categoria: true },
  });

  return artigo ? mapArtigo(artigo) : null;
}

export async function findAllAdmin(limit = 50, offset = 0): Promise<Artigo[]> {
  const artigos = await prisma.artigo.findMany({
    take: limit,
    skip: offset,
    orderBy: { updated_at: 'desc' },
    include: { categoria: true },
  });

  return artigos.map((artigo) => ({
    id: artigo.id,
    titulo: artigo.titulo,
    slug: artigo.slug,
    resumo: artigo.resumo,
    corpo: artigo.corpo,
    categoria_nome: artigo.categoria?.nome ?? null,
    tempo_leitura: artigo.tempo_leitura,
    status: artigo.status,
    updated_at: artigo.updated_at.toISOString(),
  }));
}

export async function createArtigo(data: {
  titulo: string;
  slug: string;
  resumo?: string;
  corpo: string;
  categoria_id?: number;
  tempo_leitura?: string;
  status?: string;
}): Promise<Artigo> {
  const artigo = await prisma.artigo.create({
    data: {
      titulo: data.titulo,
      slug: data.slug,
      resumo: data.resumo ?? null,
      corpo: data.corpo,
      categoria_id: data.categoria_id ?? null,
      tempo_leitura: data.tempo_leitura ?? null,
      status: data.status ?? 'rascunho',
    },
    include: { categoria: true },
  });

  return mapArtigo(artigo);
}

export async function updateArtigo(id: number, data: {
  titulo?: string;
  resumo?: string;
  corpo?: string;
  status?: string;
}): Promise<Artigo | null> {
  const artigo = await prisma.artigo.updateMany({
    where: { id },
    data: {
      titulo: data.titulo ?? undefined,
      resumo: data.resumo ?? undefined,
      corpo: data.corpo ?? undefined,
      status: data.status ?? undefined,
    },
  });

  if (artigo.count === 0) {
    return null;
  }

  const atualizado = await prisma.artigo.findUnique({
    where: { id },
    include: { categoria: true },
  });

  return atualizado ? mapArtigo(atualizado) : null;
}

export async function deleteArtigo(id: number): Promise<boolean> {
  const artigo = await prisma.artigo.deleteMany({ where: { id } });
  return artigo.count > 0;
}
