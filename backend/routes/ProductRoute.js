import express from "express";
import {
  updateProduct,
  getProductById,
  getProducts,
  saveProduct,
  deleteProduct,
} from "../controller/ProductController.js";

const router = express.Router();
router.get("/products",getProducts)
router.get("/products/:id",getProductById)
router.post("/products",saveProduct)
router.patch("/products/:id",updateProduct)
router.delete("/products/:id",deleteProduct)

export default router;
