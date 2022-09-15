import express from "express";
import { signUp } from "../controllers/authController.js";
import { signUpSchemaMiddlewate } from "../middlewares/schemasMiddleware.js";

const router = express.Router();
router.post("/sign-up", signUpSchemaMiddlewate, signUp);

export default router;
