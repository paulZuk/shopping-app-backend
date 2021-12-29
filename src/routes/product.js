import { Router } from "express";
import { addProduct, getProductList } from "../controllers/ProductController";
import { verifyToken } from "../controllers/UserController";

const router = Router();

router.post("/", verifyToken, addProduct);
router.get("/", verifyToken, getProductList);

export default router;
