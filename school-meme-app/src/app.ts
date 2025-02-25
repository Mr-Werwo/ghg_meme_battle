import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import memeRoutes from "./routes/memeRoutes";
import commentRoutes from "./routes/commentRoutes";
import betRoutes from "./routes/betRoutes";
import { connectToDatabase } from "./utils/db";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/memes", memeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/bets", betRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});