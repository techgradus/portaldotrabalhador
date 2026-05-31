import { Router } from 'express';
import {
  listarArtigos,
  buscarArtigoPorSlug,
  criarArtigo,
  editarArtigo,
  removerArtigo,
} from '../controllers/artigosController';

const router = Router();

router.get('/', listarArtigos);
router.get('/:slug', buscarArtigoPorSlug);
router.post('/', criarArtigo);
router.put('/:id', editarArtigo);
router.delete('/:id', removerArtigo);

export default router;
