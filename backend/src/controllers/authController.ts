import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { first_name_last_name: { first_name, last_name } }
    });

    if (!user) {
      res.status(401).json({ message: "Benutzer nicht gefunden" });
      return; // 🔹 Hier ein explizites `return;`
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Falsches Passwort" });
      return; // 🔹 Hier ein explizites `return;`
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
      },
    });
    return; // 🔹 Damit TypeScript kein Problem mit `void` hat

  } catch (error) {
    console.error("Login-Fehler:", error);
    res.status(500).json({ error: "Fehler beim Einloggen" });
    return; // 🔹 `return;` hinzufügen, um `void` einzuhalten
  }
};


// 🏷️ Nutzer manuell durch Admin erstellen
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        first_name,
        last_name,
        password: hashedPassword,
        role,
      },
    });

    res.json({ message: "Benutzer erfolgreich erstellt" });

  } catch (error) {
    res.status(500).json({ error: "Fehler beim Erstellen des Benutzers" });
  }
};
