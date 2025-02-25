import express, { Request, Response } from "express";
import { login, createUser } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/create-user", createUser);

export default router;