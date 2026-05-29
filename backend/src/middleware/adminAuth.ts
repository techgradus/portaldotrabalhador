import { Request, Response, NextFunction } from 'express';

export function requireAdminKey(req: Request, res: Response, next: NextFunction): void {
  if (req.headers['x-admin-key'] !== process.env.ADMIN_API_KEY) {
    res.status(401).json({ message: 'Não autorizado.' });
    return;
  }
  next();
}
