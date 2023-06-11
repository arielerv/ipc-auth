import { Router } from 'express';
import { handlerLogin } from './session.handlers';

const router = Router();

router.post('/login', handlerLogin);

export default router;
