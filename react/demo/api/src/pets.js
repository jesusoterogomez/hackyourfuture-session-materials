import { json } from "./http.js";

export async function listPets({ env }) {
  const { results } = await env.paws_db.prepare("SELECT * FROM pets").all();
  return json(results.map(normalizePet));
}

export async function getPet({ env, params }) {
  const row = await env.paws_db
    .prepare("SELECT * FROM pets WHERE id = ?")
    .bind(Number(params.id))
    .first();

  if (!row) return json({ error: "Pet not found" }, 404);

  return json(normalizePet(row));
}

export async function createPet({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { name, breed, description, age, fee, available, goodWithKids, image } =
    body;

  if (!name || !breed || !description || age == null || fee == null) {
    return json(
      {
        error: "Missing required fields: name, breed, description, age, fee",
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

export function normalizePet(row) {
  return {
    ...row,
    available: Boolean(row.available),
    goodWithKids: Boolean(row.goodWithKids),
  };
}
