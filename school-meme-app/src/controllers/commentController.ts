import { Request, Response } from "express";
import CommentService from "../services/commentService";

export const addComment = async (req: Request, res: Response) => {
    try {
        const { memeId, userId, content } = req.body;
        const newComment = await CommentService.addComment(memeId, userId, content);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        await CommentService.deleteComment(commentId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error });
    }
};

export const getCommentsByMemeId = async (req: Request, res: Response) => {
    try {
        const { memeId } = req.params;
        const comments = await CommentService.getCommentsByMemeId(memeId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving comments", error });
    }
};