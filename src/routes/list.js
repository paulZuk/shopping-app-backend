import { Router } from 'express';
import { addList, getList, deleteList } from '../controllers/ListController';
import { verifyToken } from '../controllers/UserController';

const router = Router();

router.post('/', verifyToken, addList);
router.get('/', verifyToken, getList);
router.delete('/', verifyToken, deleteList);

export default router;
