import express from "express";
import knex from "knex";

// Set up express server
const app = express();

// Support JSON content types in requests
app.use(express.json());

// Serve frontend files from the app directory
app.use(express.static("./app"));

// Set up database
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

app.listen(3000, () => console.log("App running on http://localhost:3000"));
