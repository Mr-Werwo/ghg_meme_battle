import { Meme } from "../models/memeModel";
import { Comment } from "../models/commentModel";

export const uploadMeme = async (memeData: any) => {
    const newMeme = new Meme(memeData);
    return await newMeme.save();
};

export const getMemes = async () => {
    return await Meme.find().populate('comments');
};

export const moderateMeme = async (memeId: string, isApproved: boolean) => {
    return await Meme.findByIdAndUpdate(memeId, { isApproved }, { new: true });
};

export const addCommentToMeme = async (memeId: string, commentData: any) => {
    const comment = new Comment(commentData);
    await comment.save();
    return await Meme.findByIdAndUpdate(memeId, { $push: { comments: comment._id } }, { new: true });
};