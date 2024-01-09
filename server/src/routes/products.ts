import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:code", updateProduct);
router.delete("/:code", deleteProduct);

export default router;
