import express from "express";
import { insertHistoric } from "../controllers/historicController.js";
import { hasToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(hasToken);

router.post("/historic", insertHistoric);
router.post("/historic", getHistoric);

export default router;
