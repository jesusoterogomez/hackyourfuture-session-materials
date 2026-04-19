const pets = [
  {
    id: 1,
    image: "https://paws-api.jesusotero.workers.dev/images/cat.png",
    name: "Stepan",
    breed: "Domestic Cat",
    description: "Loves sunny spots, sleeping, and ignoring you.",
    age: 2,
    fee: 180,
    available: true,
    goodWithKids: true,
  },
  {
    id: 2,
    image: "https://paws-api.jesusotero.workers.dev/images/dog.png",
    name: "Bailey",
    breed: "Golden Retriever",
    description: "Enthusiastic, loyal, and obsessed with tennis balls.",
    age: 3,
    fee: 250,
    available: true,
    goodWithKids: true,
  },
  {
    id: 3,
    image: "https://paws-api.jesusotero.workers.dev/images/rabbit.png",
    name: "Oolong",
    breed: "Holland Lop",
    description: "Fluffy, fast, and surprisingly opinionated.",
    age: 1,
    fee: 100,
    available: true,
    goodWithKids: false,
  },
  {
    id: 4,
    image: "https://paws-api.jesusotero.workers.dev/images/frog.png",
    name: "Ribbit",
    breed: "Tree Frog",
    description: "Chill, green, and jumps when least expected.",
    age: 1,
    fee: 180,
    available: false,
    goodWithKids: true,
  },
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "");

    if (path === "/pets") {
      return json(pets);
    }

    const single = path.match(/^\/pets\/(\d+)$/);
    if (single) {
      const pet = pets.find((p) => p.id === Number(single[1]));
      if (!pet) return json({ error: "Pet not found" }, 404);
      return json(pet);
    }

    return json({ error: "Not found" }, 404);
  },
};
