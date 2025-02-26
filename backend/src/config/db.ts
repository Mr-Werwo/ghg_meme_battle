import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({path: '.env'});

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "meme_admin",
  password: "admin123",
  database: "meme_battle",
  port: 3306,
  connectionLimit: 10
});

console.log("Verbindung zu MySQL:", process.env.DB_HOST, process.env.DB_USER);


export default db.promise();
