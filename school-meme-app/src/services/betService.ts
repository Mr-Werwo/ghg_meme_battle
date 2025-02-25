import { Bet } from "../models/betModel";
import { User } from "../models/userModel";

export const createBet = async (userId: string, memeId: string, amount: number) => {
    const bet = new Bet({
        userId,
        memeId,
        amount,
        status: 'pending'
    });
    return await bet.save();
};

export const approveBet = async (betId: string) => {
    const bet = await Bet.findById(betId);
    if (bet) {
        bet.status = 'approved';
        return await bet.save();
    }
    throw new Error("Bet not found");
};

export const getBetsByUser = async (userId: string) => {
    return await Bet.find({ userId });
};

export const getAllBets = async () => {
    return await Bet.find();
};