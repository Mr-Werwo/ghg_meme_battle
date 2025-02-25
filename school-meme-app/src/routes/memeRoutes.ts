import express, { Request, Response } from "express";
import { uploadMeme, moderateMeme, getMemes } from "../controllers/memeController";

const router = express.Router();

router.post("/upload", uploadMeme);
router.post("/moderate/:id", moderateMeme);
router.get("/", getMemes);

export default router;