import { Router } from 'express';
import authorize from '../middleware/authentication.js';
import { validateBody } from '../middleware/validation.js';
import accountController from '../controllers/accountController.js';
import requests from '../validations/accountRequestsSchema.js';

const router = Router();

router.get('/me', authorize, accountController.getMyAccountInfo);
router.put(
  '/me',
  authorize,
  validateBody(requests),
  accountController.updateMyAccountInfo
);

export default router;
