import { Router } from 'express';
import { handleSync } from './sync.handlers';

const router = Router();

router.post('/', handleSync);

export default router;
