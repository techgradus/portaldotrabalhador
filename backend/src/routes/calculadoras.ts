import { Router } from 'express';
import { calcularRescisao, calcularSalarioLiquido, calcularFGTS } from '../controllers/calculadorasController';

const router = Router();

router.post('/rescisao', calcularRescisao);
router.post('/salario-liquido', calcularSalarioLiquido);
router.post('/fgts', calcularFGTS);

export default router;
