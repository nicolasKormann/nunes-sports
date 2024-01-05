import express from "express";
import { createProduct, getProducts } from "../controllers/product";

const router = express.Router();

router.post('/products', createProduct)
router.get('/products', getProducts);

export default router;
