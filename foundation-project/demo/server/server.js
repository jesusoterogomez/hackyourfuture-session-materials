import express from "express";
import knex from "knex";

const app = express();
const db = knex({
  client: "sqlite3",
  connection: { filename: "./database.db" },
});

app.get("/users", async (request, response) => {
  const rows = await db.raw("SELECT * FROM users");
  response.json(rows);
});

// app.post("/seed", async (request, response) => {
//   await db.raw(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email TEXT
//     )
//   `);
//   await db.raw(`INSERT INTO users (name, email) VALUES ("Alice", "alice@example.com")`);
//   await db.raw(`INSERT INTO users (name, email) VALUES ("Bob", "bob@example.com")`);

//   response.json({ message: "Seeded!" });
// });

app.listen(3000, () => console.log("http://localhost:3000"));
