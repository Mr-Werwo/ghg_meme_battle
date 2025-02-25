import { Pool } from "mysql2/promise";
import { Bet } from "../types";

const pool = Pool({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "school_meme_app",
});

export const createBet = async (bet: Bet) => {
  const [result] = await pool.execute(
    "INSERT INTO bets (meme_id, user_id, amount, created_at) VALUES (?, ?, ?, NOW())",
    [bet.memeId, bet.userId, bet.amount]
  );
  return result;
};

export const getBetsByMemeId = async (memeId: number) => {
  const [rows] = await pool.execute("SELECT * FROM bets WHERE meme_id = ?", [memeId]);
  return rows;
};

export const approveBet = async (betId: number) => {
  const [result] = await pool.execute("UPDATE bets SET approved = TRUE WHERE id = ?", [betId]);
  return result;
};

export const getAllBets = async () => {
  const [rows] = await pool.execute("SELECT * FROM bets");
  return rows;
};