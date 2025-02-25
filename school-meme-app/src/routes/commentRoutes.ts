import express, { Request, Response } from "express";
import { addComment, deleteComment, getComments } from "../controllers/commentController";

const router = express.Router();

router.post("/add", (req: Request, res: Response) => addComment(req, res));
router.delete("/delete/:id", (req: Request, res: Response) => deleteComment(req, res));
router.get("/meme/:memeId", (req: Request, res: Response) => getComments(req, res));

export default router;