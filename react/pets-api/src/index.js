const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function html(content) {
  return new Response(content, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function normalizePet(row) {
  return {
    ...row,
    available: Boolean(row.available),
    goodWithKids: Boolean(row.goodWithKids),
  };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "");

    // GET /pets
    if (path === "/pets" && request.method === "GET") {
      const { results } = await env.paws_db.prepare("SELECT * FROM pets").all();
      return json(results.map(normalizePet));
    }

    // GET /pets/:id
    const single = path.match(/^\/pets\/(\d+)$/);
    if (single && request.method === "GET") {
      const row = await env.paws_db
        .prepare("SELECT * FROM pets WHERE id = ?")
        .bind(Number(single[1]))
        .first();
      if (!row) return json({ error: "Pet not found" }, 404);
      return json(normalizePet(row));
    }

    // POST /pets
    if (path === "/pets" && request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }

      const { name, breed, description, age, fee, available, goodWithKids, image } = body;

      if (!name || !breed || !description || age == null || fee == null) {
        return json({ error: "Missing required fields: name, breed, description, age, fee" }, 400);
      }

      const result = await env.paws_db
        .prepare(
          "INSERT INTO pets (name, breed, description, age, fee, available, goodWithKids, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(
          name,
          breed,
          description,
          age,
          fee,
          available !== undefined ? (available ? 1 : 0) : 1,
          goodWithKids !== undefined ? (goodWithKids ? 1 : 0) : 1,
          image ?? null
        )
        .run();

      const newPet = await env.paws_db
        .prepare("SELECT * FROM pets WHERE id = ?")
        .bind(result.meta.last_row_id)
        .first();

      return json(normalizePet(newPet), 201);
    }

    // GET /docs
    if (path === "/docs") {
      return html(DOCS_HTML);
    }

    return json({ error: "Not found" }, 404);
  },
};

const DOCS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Paws API Docs</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 760px; margin: 40px auto; padding: 0 20px; color: #222; }
    h1 { font-size: 1.8rem; }
    h2 { font-size: 1.2rem; margin-top: 2rem; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
    code, pre { background: #f5f5f5; border-radius: 4px; font-family: monospace; }
    code { padding: 2px 6px; font-size: 0.9em; }
    pre { padding: 12px 16px; overflow-x: auto; font-size: 0.85em; line-height: 1.5; }
    .method { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; margin-right: 6px; }
    .get { background: #d1fae5; color: #065f46; }
    .post { background: #dbeafe; color: #1e40af; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 0.9em; }
    th, td { text-align: left; padding: 6px 10px; border-bottom: 1px solid #eee; }
    th { background: #f9f9f9; }
    .base { color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>🐾 Paws API</h1>
  <p class="base">Base URL: <code>https://paws-api.jdog.dev</code></p>

  <h2><span class="method get">GET</span> /pets</h2>
  <p>Returns all pets.</p>
  <pre>GET /pets</pre>

  <h2><span class="method get">GET</span> /pets/:id</h2>
  <p>Returns a single pet by ID.</p>
  <pre>GET /pets/1</pre>

  <h2><span class="method post">POST</span> /pets</h2>
  <p>Adds a new pet. Required fields: <code>name</code>, <code>breed</code>, <code>description</code>, <code>age</code>, <code>fee</code>.</p>
  <pre>POST /pets
Content-Type: application/json

{
  "name": "Luna",
  "breed": "Siamese Cat",
  "description": "Vocal and affectionate.",
  "age": 2,
  "fee": 160,
  "available": true,
  "goodWithKids": true,
  "image": "cat.png"
}</pre>

  <h2>Pet object</h2>
  <table>
    <tr><th>Field</th><th>Type</th><th>Description</th></tr>
    <tr><td><code>id</code></td><td>number</td><td>Auto-assigned unique ID</td></tr>
    <tr><td><code>name</code></td><td>string</td><td>Pet's name</td></tr>
    <tr><td><code>breed</code></td><td>string</td><td>Breed or species</td></tr>
    <tr><td><code>description</code></td><td>string</td><td>Short description</td></tr>
    <tr><td><code>age</code></td><td>number</td><td>Age in years</td></tr>
    <tr><td><code>fee</code></td><td>number</td><td>Adoption fee in USD</td></tr>
    <tr><td><code>available</code></td><td>boolean</td><td>Whether the pet is available</td></tr>
    <tr><td><code>goodWithKids</code></td><td>boolean</td><td>Kid-friendly?</td></tr>
    <tr><td><code>image</code></td><td>string | null</td><td>Image filename</td></tr>
  </table>
</body>
</html>`;
