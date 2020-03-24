import { Router } from 'express';
import { registerUser } from '../controllers/UserController';

const router = Router();

router.post('/', registerUser);

export default router;