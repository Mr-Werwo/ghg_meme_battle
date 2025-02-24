"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || "default_secret";
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Kein Token vorhanden" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = decoded; // ✅ Jetzt ist req.user definiert
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Ungültiges Token" });
    }
};
exports.verifyToken = verifyToken;
