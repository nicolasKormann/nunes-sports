import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../controllers/product";

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getProducts);
router.put("/:code", updateProduct);

export default router;
