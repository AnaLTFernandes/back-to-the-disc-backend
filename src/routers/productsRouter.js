import express from "express";
import { getDescription, getProducts } from "../controllers/productsController.js";
import hasPageMiddleware from "../middlewares/productsMiddleware.js";


const router = express.Router();

router.get('/products', hasPageMiddleware, getProducts);
router.get('/description/:productId', getDescription);

export default router;