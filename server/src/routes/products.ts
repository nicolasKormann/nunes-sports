import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product";

const router = express.Router();

router.post("/api/products", createProduct);
router.get("/api/products", getProducts);
router.put("/api/products/:code", updateProduct);
router.delete("/api/products/:code", deleteProduct);

export default router;
