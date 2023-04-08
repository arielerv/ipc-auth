import { Router } from 'express';
import { handlerValidateToken, handlerLogin } from './session.handlers';

const router = Router();

router.post('/validate', handlerValidateToken);
router.post('/login', handlerLogin);

export default router;
