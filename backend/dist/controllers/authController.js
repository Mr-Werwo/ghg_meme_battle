"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.login = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || "default_secret";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, password } = req.body;
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM users WHERE first_name = ? AND last_name = ?", [first_name, last_name]);
        if (rows.length === 0) {
            res.status(401).json({ message: "Benutzer nicht gefunden" });
            return;
        }
        const user = rows[0];
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ message: "Falsches Passwort" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "7d" });
        res.json({
            token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                coins: user.coins,
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: "Server-Fehler" });
    }
});
exports.login = login;
// 🏷️ Nutzer manuell durch Admin erstellen
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, password, role } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield db_1.default.query("INSERT INTO users (first_name, last_name, password, role) VALUES (?, ?, ?, ?)", [first_name, last_name, hashedPassword, role]);
        res.json({ message: "Benutzer erfolgreich erstellt" });
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Erstellen des Benutzers" });
    }
});
exports.createUser = createUser;
