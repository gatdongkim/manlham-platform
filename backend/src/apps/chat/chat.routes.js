import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { send, messages } from './chat.controller.js';

const router = express.Router();

router.use(authMiddleware());

router.post('/', send);
router.get('/:userId', messages); 

export default router;