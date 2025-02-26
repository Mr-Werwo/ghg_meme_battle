import { Request, Response } from "express";
import db from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, password } = req.body;

  try {
    const [rows]: [any[], any] = await db.query(
      "SELECT * FROM users WHERE first_name = ? AND last_name = ?",
      [first_name, last_name]
    );

    if (rows.length === 0) {
      res.status(401).json({ message: "Benutzer nicht gefunden" });
      return;
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).json({ message: "Falsches Passwort" });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        coins: user.coins,
      }
    });

  } catch (error) {
    console.error("Login-Fehler:", error); // Logge den Fehler in die Konsole
    res.status(500).json({ error: "Fehler beim Einloggen", details: error instanceof Error ? error.message : String(error) });
  }
};



// 🏷️ Nutzer manuell durch Admin erstellen
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (first_name, last_name, password, role) VALUES (?, ?, ?, ?)", 
      [first_name, last_name, hashedPassword, role]);

    res.json({ message: "Benutzer erfolgreich erstellt" });

  } catch (error) {
    res.status(500).json({ error: "Fehler beim Erstellen des Benutzers" });
  }
};
