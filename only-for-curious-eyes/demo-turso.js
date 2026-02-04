/*
 * TURSO - SQLite in the cloud
 * 
 * Why use this?
 * - Local SQLite files don't work well with serverless deployments (Vercel, Netlify)
 * - Turso hosts your SQLite database in the cloud
 * - Same SQL syntax you already know
 * - Free tier: 9GB storage, 1 billion reads/month
 * 
 * Setup:
 * 1. Install CLI:        brew install tursodatabase/tap/turso
 * 2. Login:              turso auth login
 * 3. Create database:    turso db create memory-game
 * 4. Get URL:            turso db show memory-game --url
 * 5. Get token:          turso db tokens create memory-game
 * 
 * Install dependency:
 *   npm install @libsql/client
 * 
 * Docs: https://turso.tech/docs
 */

import express from "express";
import { createClient } from "@libsql/client";

const app = express();

const db = createClient({
  url: process.env.TURSO_URL,        // libsql://your-db-name.turso.io
  authToken: process.env.TURSO_TOKEN,
});

app.get("/users", async (req, res) => {
  const result = await db.execute("SELECT * FROM users");
  res.json(result.rows);
});

app.post("/seed", async (req, res) => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);
  await db.execute(`INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')`);
  await db.execute(`INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com')`);
  res.json({ message: "Seeded!" });
});

app.listen(3000, () => console.log("http://localhost:3000"));
