import { Router } from 'express';
import { handlerSync, handlerSyncUpdate } from './sync.handlers';

const router = Router();

router.get('/sync', handlerSync);
router.post('/sync', handlerSyncUpdate);

export default router;
