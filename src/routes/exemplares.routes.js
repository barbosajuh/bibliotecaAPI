import { Router } from 'express';
import { listar, disponibilidade, criar } from '../controllers/exemplares.controller.js';

const router = Router();

router.get('/', listar);
router.get('/disponibilidade', disponibilidade);
router.post('/', criar);

export default router;