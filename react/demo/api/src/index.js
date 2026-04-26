import DOCS_HTML from "./docs.html";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const REQUEST_FIELD_MAX_LEN = 200;

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

function normalizeAdoptionRequest(row) {
  return {
    id: row.id,
    name: row.adopter_name,
    petName: row.pet_name,
    createdAt: row.created_at,
  };
}

/**
 * @param {unknown} body
 * @returns {{ name: string, petName: string } | { error: string }}
 */
function parseAdoptionRequestBody(body) {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Body must be a JSON object" };
  }

  const raw = /** @type {{ name?: unknown, petName?: unknown }} */ (body);
  const name =
    typeof raw.name === "string" ? raw.name.trim() : "";
  const petName =
    typeof raw.petName === "string" ? raw.petName.trim() : "";

  if (!name || !petName) {
    return { error: "name and petName are required" };
  }

  if (name.length > REQUEST_FIELD_MAX_LEN || petName.length > REQUEST_FIELD_MAX_LEN) {
    return {
      error: `name and petName must be at most ${REQUEST_FIELD_MAX_LEN} characters`,
    };
  }

  return { name, petName };
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

    // DELETE /requests/:id
    const requestById = path.match(/^\/requests\/(\d+)$/);
    if (requestById && request.method === "DELETE") {
      const id = Number(requestById[1]);
      const existing = await env.paws_db
        .prepare("SELECT id FROM adoption_requests WHERE id = ?")
        .bind(id)
        .first();
      if (!existing) {
        return json({ error: "Not found" }, 404);
      }
      await env.paws_db
        .prepare("DELETE FROM adoption_requests WHERE id = ?")
        .bind(id)
        .run();
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // GET /requests
    if (path === "/requests" && request.method === "GET") {
      const { results } = await env.paws_db
        .prepare(
          "SELECT * FROM adoption_requests ORDER BY id DESC"
        )
        .all();
      return json((results || []).map(normalizeAdoptionRequest));
    }

    // POST /requests
    if (path === "/requests" && request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }

      const parsed = parseAdoptionRequestBody(body);
      if ("error" in parsed) {
        return json({ error: parsed.error }, 400);
      }

      const { name, petName } = parsed;
      const pet = await env.paws_db
        .prepare("SELECT id FROM pets WHERE LOWER(name) = LOWER(?)")
        .bind(petName)
        .first();
      if (!pet) {
        return json({ error: "We don't have a pet with that name" }, 400);
      }

      const result = await env.paws_db
        .prepare(
          "INSERT INTO adoption_requests (adopter_name, pet_name) VALUES (?, ?)"
        )
        .bind(name, petName)
        .run();

      const newRow = await env.paws_db
        .prepare("SELECT * FROM adoption_requests WHERE id = ?")
        .bind(result.meta.last_row_id)
        .first();

      return json(normalizeAdoptionRequest(newRow), 201);
    }

    // GET /docs
    if (path === "/docs" || path === "" || path === "/") {
      return html(DOCS_HTML);
    }

    return json({ error: "Not found" }, 404);
  },
};
