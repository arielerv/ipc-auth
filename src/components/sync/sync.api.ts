import { Router } from 'express';
import { handlerSync } from './sync.handlers';

const router = Router();

router.get('/sync', handlerSync);

export default router;
