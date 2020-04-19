import { Router } from "express";
import { addList } from "../controllers/ListController";
import { verifyToken } from '../controllers/UserController';

const router = Router();

router.post('/', verifyToken, addList);

export default router;