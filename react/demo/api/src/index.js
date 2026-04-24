import DOCS_HTML from "./docs.html";

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

      const {
        name,
        breed,
        description,
        age,
        fee,
        available,
        goodWithKids,
        image,
      } = body;

      if (!name || !breed || !description || age == null || fee == null) {
        return json(
          {
            error:
              "Missing required fields: name, breed, description, age, fee",
          },
          400
        );
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
    if (path === "/docs" || path === "" || path === "/") {
      return html(DOCS_HTML);
    }

    return json({ error: "Not found" }, 404);
  },
};
