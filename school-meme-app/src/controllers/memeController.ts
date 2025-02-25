import { Request, Response } from "express";
import { Meme } from "../models/memeModel";
import { memeService } from "../services/memeService";

export const uploadMeme = async (req: Request, res: Response) => {
    try {
        const memeData = req.body;
        const newMeme = await memeService.createMeme(memeData);
        res.status(201).json(newMeme);
    } catch (error) {
        res.status(500).json({ message: "Error uploading meme", error });
    }
};

export const getMemes = async (req: Request, res: Response) => {
    try {
        const memes = await memeService.getAllMemes();
        res.status(200).json(memes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving memes", error });
    }
};

export const moderateMeme = async (req: Request, res: Response) => {
    try {
        const { memeId, approved } = req.body;
        const updatedMeme = await memeService.moderateMeme(memeId, approved);
        res.status(200).json(updatedMeme);
    } catch (error) {
        res.status(500).json({ message: "Error moderating meme", error });
    }
};