import express from "express";

const router = express.Router();

// Beispielroute für spätere Wetten
router.get("/", (req, res) => {
  res.send("Bet API läuft!");
});

export default router;
