import express from "express";
import { verifyToken } from "../middlewares/security.js";
import {
  getProductsWithStock,
  massiveUpdateOfProductStock,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/stock", [verifyToken], getProductsWithStock);
productRouter.put(
  "/massive-update-stock",
  [verifyToken],
  massiveUpdateOfProductStock
);

export default productRouter;
