import express from "express";
import { signUp, signIn } from "../controllers/authController.js";
import {
  signUpSchemaMiddleware,
  signInSchemaMiddleware,
} from "../middlewares/schemasMiddleware.js";

const router = express.Router();
router.post("/sign-up", signUpSchemaMiddleware, signUp);
router.post("/sign-in", signInSchemaMiddleware, signIn);

export default router;
