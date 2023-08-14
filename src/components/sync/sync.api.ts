import { Router } from 'express';
import { handlerSync, handlerSyncUpdate, handlerGetSurveys } from './sync.handlers';

const router = Router();

router.get('/workload/', handlerSync);
router.post('/surveys/', handlerSyncUpdate);
router.get('/surveys/', handlerGetSurveys);

export default router;
