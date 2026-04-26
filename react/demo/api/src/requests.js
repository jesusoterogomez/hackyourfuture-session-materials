import { CORS_HEADERS, json } from "./http.js";

export async function deleteRequest({ env, params }) {
  const id = Number(params.id);

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

export async function listRequests({ env }) {
  const { results } = await env.paws_db
    .prepare("SELECT * FROM adoption_requests ORDER BY id DESC")
    .all();

  return json((results || []).map(normalizeAdoptionRequest));
}

export async function createRequest({ request, env }) {
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

export function normalizeAdoptionRequest(row) {
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
export function parseAdoptionRequestBody(body) {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Body must be a JSON object" };
  }

  const raw = /** @type {{ name?: unknown, petName?: unknown }} */ (body);
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const petName = typeof raw.petName === "string" ? raw.petName.trim() : "";

  if (!name || !petName) {
    return { error: "name and petName are required" };
  }

  return { name, petName };
}
