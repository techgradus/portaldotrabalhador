import { Request, Response, NextFunction } from 'express';
import { findAllAdmin } from '../repositories/artigosRepository';
import { prisma } from '../config/database';

export async function listarArtigosAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const artigos = await findAllAdmin(limit, offset);
    res.json(artigos);
  } catch (err) {
    next(err);
  }
}

export async function estatisticasDashboard(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dataLimite = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const chatUltimoMes = await prisma.chatLog.count({
      where: { created_at: { gte: dataLimite } },
    });
    const calculosUltimoMes = await prisma.metricasCalculadora.count({
      where: { created_at: { gte: dataLimite } },
    });

    res.json({
      chatUltimoMes,
      calculosUltimoMes,
    });
  } catch (err) {
    next(err);
  }
}
