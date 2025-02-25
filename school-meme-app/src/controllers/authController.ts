import { Request, Response } from "express";
import { createUser, loginUser } from "../services/authService";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};