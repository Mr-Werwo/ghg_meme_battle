import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Kein Token vorhanden" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // ✅ Jetzt ist req.user definiert
    next();
  } catch (error) {
    res.status(401).json({ message: "Ungültiges Token" });
  }
};
