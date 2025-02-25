import express, { Request, Response } from "express";
import { createBet, approveBet, getBets } from "../controllers/betController";

const router = express.Router();

router.post("/create-bet", (req: Request, res: Response) => createBet(req, res));
router.post("/approve-bet/:id", (req: Request, res: Response) => approveBet(req, res));
router.get("/bets", (req: Request, res: Response) => getBets(req, res));

export default router;