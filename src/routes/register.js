import { Router } from 'express';
import { registerUser } from '../controllers/RegisterController';

const router = Router();

router.post('/', registerUser);

export default router;