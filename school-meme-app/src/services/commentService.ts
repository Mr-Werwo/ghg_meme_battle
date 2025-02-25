import { Comment } from "../models/commentModel";
import { User } from "../models/userModel";

export const addComment = async (memeId: number, userId: number, content: string) => {
    const newComment = new Comment({
        memeId,
        userId,
        content,
        createdAt: new Date(),
    });
    return await newComment.save();
};

export const deleteComment = async (commentId: number, userId: number) => {
    const comment = await Comment.findById(commentId);
    if (comment && comment.userId === userId) {
        return await Comment.deleteOne({ _id: commentId });
    }
    throw new Error("Comment not found or user not authorized to delete this comment.");
};

export const getCommentsByMemeId = async (memeId: number) => {
    return await Comment.find({ memeId }).populate("userId", "username");
};