import { Request, Response } from "express";
import BetService from "../services/betService";

const BetController = {
    createBet: async (req: Request, res: Response) => {
        try {
            const { memeId, amount } = req.body;
            const bet = await BetService.createBet(req.user.id, memeId, amount);
            res.status(201).json(bet);
        } catch (error) {
            res.status(500).json({ message: "Error creating bet", error });
        }
    },

    approveBet: async (req: Request, res: Response) => {
        try {
            const { betId } = req.params;
            const approvedBet = await BetService.approveBet(betId);
            res.status(200).json(approvedBet);
        } catch (error) {
            res.status(500).json({ message: "Error approving bet", error });
        }
    },

    getBets: async (req: Request, res: Response) => {
        try {
            const bets = await BetService.getBets(req.user.id);
            res.status(200).json(bets);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving bets", error });
        }
    }
};

export default BetController;