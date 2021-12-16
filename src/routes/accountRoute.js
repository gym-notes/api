import { Router } from 'express';
import authorize from '../middleware/authentication.js';
import accountController from '../controllers/accountController.js';

const router = Router();

router.get('/me', authorize, accountController.getMyAccountInfo);

export default router;
