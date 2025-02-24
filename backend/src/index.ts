import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import memeRoutes from "./routes/memeRoutes";
import betRoutes from "./routes/betRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/memes", memeRoutes);
app.use("/api/bets", betRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend läuft auf Port ${PORT}`));
