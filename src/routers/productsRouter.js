import express from "express";
import { getProducts } from "../controllers/productsController.js";
import hasPageMiddleware from "../middlewares/productsMiddleware.js";

const router = express.Router();

router.get('/products', hasPageMiddleware, getProducts);

export default router;