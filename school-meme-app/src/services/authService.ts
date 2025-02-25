import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export const registerUser = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, password: hashedPassword });
    return await newUser.save();
};

export const loginUser = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    return { token, user };
};

export const validateToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || "secret");
    } catch (error) {
        return null;
    }
};