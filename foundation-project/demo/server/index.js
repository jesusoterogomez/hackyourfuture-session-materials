import express from "express";
import knex from "knex";

// Set up express server
const app = express();
app.use(express.json()); // Support JSON content types in requests

// Serve frontend files from the app directory
// 👀 Note: This needs to be updated to the path of your frontend directory
app.use(express.static("../app"));

// Set up database - Creates an instance of the Knex library
// connected to our SQLite database file.
const db = knex({
  client: "sqlite3",
  connection: { filename: "./database.db" },
  useNullAsDefault: true, // Required for SQLite
});

// GET endpoint for listing data from a database
app.get("/users", async function (request, response) {
  const rows = await db.raw("SELECT * FROM users");
  response.json(rows); // Respond with the data in JSON format
});

// POST endpoint for creating a new user
app.post("/users", async (request, response) => {
  const user = request.body;

  // Insert the new user into the database
  // await db.raw("INSERT INTO users (name) VALUES (?)", [name]);

  // Knex provides a query builder that lets you write database queries using JavaScript
  // instead of raw SQL. This is safer (prevents SQL injection) and more readable.
  await db("users").insert({ name: user.name });

  response.json({ success: true });
});

// Start the server on port 3000 on your local machine
const server = app.listen(3000, function () {
  console.log("App running on http://localhost:3000. Type Ctrl+C to stop.");
});

// Show errors when the server fails to start
server.on("error", function (error) {
  console.error("Server error:", error.message);
});
