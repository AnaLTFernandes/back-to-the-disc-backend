import express from "express";
import { insertHistoric, getHistoric } from "../controllers/historicController.js";
import { hasToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(hasToken);

router.post("/historic", insertHistoric);
router.get("/historic", getHistoric);

export default router;
