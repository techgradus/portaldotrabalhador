import { Router } from 'express';
import { recomendarArtigos } from '../controllers/recomendacoesController';

const router = Router();

router.get('/', recomendarArtigos);

export default router;
