import { Router } from "express";
import { addList, getList } from "../controllers/ListController";
import { verifyToken } from "../controllers/UserController";

const router = Router();

router.post("/", verifyToken, addList);
router.get("/", verifyToken, getList);

export default router;
