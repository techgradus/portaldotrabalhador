import { Request, Response, NextFunction } from 'express';
import {
  findAllPublicados,
  findBySlug,
  createArtigo,
  updateArtigo,
  deleteArtigo,
} from '../repositories/artigosRepository';

export async function listarArtigos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const categoria = typeof req.query.categoria === 'string' ? req.query.categoria : undefined;
    const artigos = await findAllPublicados(categoria);
    res.json(artigos);
  } catch (err) {
    next(err);
  }
}

export async function buscarArtigoPorSlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const artigo = await findBySlug(req.params.slug);
    if (!artigo) {
      res.status(404).json({ message: 'Artigo não encontrado.' });
      return;
    }
    res.json(artigo);
  } catch (err) {
    next(err);
  }
}

export async function criarArtigo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { titulo, slug, resumo, corpo, categoria_id, tempo_leitura, status } = req.body;
    if (!titulo || !slug || !corpo) {
      res.status(400).json({ message: 'titulo, slug e corpo são obrigatórios.' });
      return;
    }
    const artigo = await createArtigo({ titulo, slug, resumo, corpo, categoria_id, tempo_leitura, status });
    res.status(201).json(artigo);
  } catch (err) {
    next(err);
  }
}

export async function editarArtigo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    const artigo = await updateArtigo(id, req.body);
    if (!artigo) {
      res.status(404).json({ message: 'Artigo não encontrado.' });
      return;
    }
    res.json(artigo);
  } catch (err) {
    next(err);
  }
}

export async function removerArtigo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    const removido = await deleteArtigo(id);
    if (!removido) {
      res.status(404).json({ message: 'Artigo não encontrado.' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
