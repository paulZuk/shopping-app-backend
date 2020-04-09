import { Router } from "express";
import { loginUser } from "../controllers/UserController";

const router = Router();

router.post("/", loginUser);

export default router;
