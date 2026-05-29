import { Router } from 'express';
import { listarArtigosAdmin, estatisticasDashboard } from '../controllers/adminController';
import { requireAdminKey } from '../middleware/adminAuth';

const router = Router();

router.use(requireAdminKey);

router.get('/artigos', listarArtigosAdmin);
router.get('/dashboard', estatisticasDashboard);

export default router;
