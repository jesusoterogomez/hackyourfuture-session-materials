import express from "express";
import knex from "knex";

// Set up express server
const app = express();
app.use(express.json()); // Support JSON content types in requests

// Serve frontend files from the app directory
app.use(express.static("./app"));

// Set up database
const db = knex({
  client: "sqlite3",
  connection: { filename: "./server/database.db" },
});

// GET endpoint for listing all users from the database table "users"
app.get("/users", async (request, response) => {
  // Get all users from the database
  const rows = await db.raw("SELECT * FROM users");
  response.json(rows); // Respond with the users list in JSON format
});

// Start the server on port 3000 on your local machine
app.listen(3000, () => console.log("App running on http://localhost:3000"));
