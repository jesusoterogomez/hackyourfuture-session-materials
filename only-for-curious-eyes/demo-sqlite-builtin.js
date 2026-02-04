// Requires Node 22.5+ and --experimental-sqlite flag
// Run with: node --experimental-sqlite demo-sqlite-builtin.js

import express from "express";
import { DatabaseSync } from "node:sqlite";

const app = express();
const db = new DatabaseSync("./demo.db");

app.get("/users", (req, res) => {
  const rows = db.prepare("SELECT * FROM users").all();
  res.json(rows);
});

app.post("/seed", (req, res) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);
  db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`).run("Alice", "alice@example.com");
  db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`).run("Bob", "bob@example.com");
  res.json({ message: "Seeded!" });
});

app.listen(3000, () => console.log("http://localhost:3000"));
