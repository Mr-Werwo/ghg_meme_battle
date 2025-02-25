import { Pool } from "mysql2/promise";
import { Comment } from "../types";

const pool = Pool({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "school_meme_app",
});

export const createComment = async (comment: Comment) => {
  const [result] = await pool.query(
    "INSERT INTO comments (meme_id, user_id, content) VALUES (?, ?, ?)",
    [comment.memeId, comment.userId, comment.content]
  );
  return result;
};

export const getCommentsByMemeId = async (memeId: number) => {
  const [rows] = await pool.query("SELECT * FROM comments WHERE meme_id = ?", [memeId]);
  return rows;
};

export const deleteComment = async (commentId: number) => {
  const [result] = await pool.query("DELETE FROM comments WHERE id = ?", [commentId]);
  return result;
};