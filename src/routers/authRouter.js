import express from "express";
import { signUp, signIn, logout } from "../controllers/authController.js";
import {
  signUpSchemaMiddleware,
  signInSchemaMiddleware,
} from "../middlewares/schemasMiddleware.js";

const router = express.Router();
router.post("/sign-up", signUpSchemaMiddleware, signUp);
router.post("/sign-in", signInSchemaMiddleware, signIn);
router.put("/logout", logout);

export default router;
