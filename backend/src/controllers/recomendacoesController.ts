import { Request, Response, NextFunction } from 'express';
import { recomendarArtigosPorCalculadoras } from '../services/mlRecommendationService';

export async function recomendarArtigos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const origem = typeof req.query.calculadoras === 'string' ? req.query.calculadoras : '';
    const calculadoras = origem
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    res.json({
      modelo: 'recomendacao-por-conteudo',
      entrada: calculadoras,
      recomendacoes: recomendarArtigosPorCalculadoras(calculadoras),
    });
  } catch (err) {
    next(err);
  }
}
