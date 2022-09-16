import express from "express";
import { insertHistoric } from "../controllers/historicController.js";

const router = express.Router();
router.post("/historic", insertHistoric);

export default router;
