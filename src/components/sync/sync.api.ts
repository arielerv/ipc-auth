import { Router } from 'express';
import { handlerSync, handlerSyncUpdate, handlerGetSurveys } from './sync.handlers';

const router = Router();

router.get('/sync', handlerSync);
router.post('/sync', handlerSyncUpdate);
router.get('/surveys/', handlerGetSurveys);

export default router;
