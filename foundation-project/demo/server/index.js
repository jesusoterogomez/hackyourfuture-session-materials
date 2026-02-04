import express from "express";
import knex from "knex";

const app = express();
const db = knex({
  client: "sqlite3",
  connection: { filename: "./server/database.db" },
});

// Serve frontend files
app.use(express.static("./app"));

app.get("/users", async (request, response) => {
  const rows = await db.raw("SELECT * FROM users");
  response.json(rows);
});

app.get("/leaderboard", async (request, response) => {
  response.json([]);
});

app.listen(3000, () => console.log("http://localhost:3000"));
