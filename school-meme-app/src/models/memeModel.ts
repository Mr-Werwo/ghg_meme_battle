import { Pool } from "mysql2/promise";
import { Meme } from "../types";

const pool = Pool({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "school_meme_app",
});

export const createMeme = async (meme: Meme) => {
  const [result] = await pool.execute(
    "INSERT INTO memes (title, imageUrl, userId, createdAt) VALUES (?, ?, ?, ?)",
    [meme.title, meme.imageUrl, meme.userId, new Date()]
  );
  return result;
};

export const getMemes = async () => {
  const [rows] = await pool.execute("SELECT * FROM memes");
  return rows;
};

export const getMemeById = async (id: number) => {
  const [rows] = await pool.execute("SELECT * FROM memes WHERE id = ?", [id]);
  return rows[0];
};

export const moderateMeme = async (id: number, isApproved: boolean) => {
  const [result] = await pool.execute(
    "UPDATE memes SET isApproved = ? WHERE id = ?",
    [isApproved, id]
  );
  return result;
};

export const deleteMeme = async (id: number) => {
  const [result] = await pool.execute("DELETE FROM memes WHERE id = ?", [id]);
  return result;
};