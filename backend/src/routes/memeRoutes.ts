import express from "express";

const router = express.Router();

// Beispielroute für späteres Meme-Handling
router.get("/", (req, res) => {
  res.send("Meme API läuft!");
});

export default router;
