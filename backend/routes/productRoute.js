import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";

import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

/* ---------------- ADD PRODUCT (BOOK) ---------------- */
productRouter.post(
  "/add",
  adminAuth,
  upload.array("images", 10), // cleaner: multiple images in one field
  addProduct
);

/* ---------------- LIST PRODUCTS ---------------- */
productRouter.get("/list", listProducts);

/* ---------------- SINGLE PRODUCT ---------------- */
productRouter.post("/single", singleProduct);

/* ---------------- REMOVE PRODUCT ---------------- */
productRouter.post("/remove", adminAuth, removeProduct);

export default productRouter;